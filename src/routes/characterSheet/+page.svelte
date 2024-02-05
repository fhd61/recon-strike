<script lang="ts">
    import Icon from "@iconify/svelte";
    import Attribute from "$lib/components/characterSheet/atributte.svelte";
    import Panel from "$lib/components/panel.svelte";
    import HpBar from "$lib/components/characterSheet/hpBar.svelte";
    import TalentsList from "$lib/components/modals/talentsList.svelte";
    import EquipmentsList from "$lib/components/modals/equipmentList.svelte";
    import Accordion from "$lib/components/characterSheet/accordion.svelte";
    import Dossier from "$lib/components/modals/dossier.svelte";
    import Settings from "$lib/components/modals/settings.svelte";
    import Ability from "$lib/components/characterSheet/ability.svelte";
    import {
        CharacterSheet as Character,
        type ICharacter,
    } from "$lib/store/character";
    import { onDestroy, onMount } from "svelte";
    import { rollFromString } from "$lib/diceRoller";
    import { toast } from "@zerodevx/svelte-toast";
    import type { IHp } from "$lib/types/interface/IHp.js";
    import { slide } from "svelte/transition";
    import {
        onCombatEnd,
        onCombatStart,
        onTurnEnd,
        onTurnStart,
    } from "$lib/store/events";

    import ItemPanel from "$lib/components/characterSheet/itemPanel.svelte";
    import TabGroup from "$lib/components/tabs/tabGroup.svelte";
    import Tab from "$lib/components/tabs/tab.svelte";
    import SkillList from "$lib/components/modals/skillList.svelte";
    import Speed from "$lib/components/characterSheet/stats/speed.svelte";
    import Ca from "$lib/components/characterSheet/stats/ca.svelte";
    import Def from "$lib/components/characterSheet/stats/def.svelte";
    import { CharacterUtils } from "$lib/utils.js";

    export let data;

    let turnCount = 0;
    let inCombatMode: boolean;
    let turnStarted: boolean;
    let mouseInsideModal: boolean;
    let modalElement: HTMLDialogElement;
    let diceRollInput: HTMLInputElement;
    let modalToShow:
        | "dossier"
        | "settings"
        | "inv_talents"
        | "inv_equipment"
        | "inv_weapons"
        | "inv_ability" = "dossier";
    let coverSelected: "heavy" | "medium" | "light" | "none" = "none";
    let coverHp: IHp = { maxValue: 30, currentValue: 30, bonus: {} };
    let saveInterval: string | number | NodeJS.Timeout | undefined;

    //@ts-expect-error
    onTurnEnd.on(() => {
        turnCount++;
    });

    //@ts-expect-error
    onCombatEnd.on(() => {
        turnCount = 0;
    });

    onMount(() => {
        let char: ICharacter | undefined = JSON.parse(
            localStorage.getItem("character") as string,
        );

        if (char) Character.set(char);

        saveInterval = setInterval(saveLocal, 10000);
    });

    onDestroy(() => {
        clearInterval(saveInterval);
    });

    async function saveLocal() {
        CharacterUtils.saveToLocalStorage();

        CharacterUtils.saveOnDb(data.supabase);
    }

    function onSelectCover() {
        const coverBonuses = {
            heavy: 3,
            medium: 2,
            light: 1,
            none: 0,
        };
        coverHp.maxValue = coverBonuses[coverSelected] * 10;
        coverHp.currentValue = coverBonuses[coverSelected] * 10;

        $Character.attributes.ac.bonus["cover"] = coverBonuses[coverSelected];

        console.log($Character);
    }
</script>

<svelte:head>
    <title>
        {$Character.dossier.name === ""
            ? "SHD | Agente Desconhecido"
            : `SHD | Agente ${$Character.dossier.name}`}
    </title>
</svelte:head>

<div class="flex flex-row max-md:flex-col text-white">
    <!-- Left Panel -->
    <div class="w-1/2 h-[95vh] px-2 py-1 overflow-y-auto overflow-x-hidden">
        <Panel title="Rolar Dados">
            <div slot="content" class="flex">
                <button
                    class="bg-zinc-800 w-14 h-8 mr-2 polygonR inline-flex justify-center items-center active:bg-zinc-700"
                    on:click={() => {
                        let res = rollFromString(diceRollInput.value);
                        toast.push(`${res?.name}<br>${res?.total}`);
                    }}
                >
                    <Icon icon="fa-solid:dice-d20" width="20" />
                </button>
                <input
                    bind:this={diceRollInput}
                    type="text"
                    placeholder="1d20 + 2"
                    class="w-full input-default"
                />
            </div>
        </Panel>
        <Panel title="Atributos">
            <div
                slot="content"
                class="flex items-center justify-around divide-[#f86b10]/20"
            >
                <Attribute bind:data={$Character.attributes["agi"]} />
                <Attribute bind:data={$Character.attributes["for"]} />
                <Attribute bind:data={$Character.attributes["int"]} />
                <Attribute bind:data={$Character.attributes["vig"]} />
            </div>
        </Panel>
        <Panel title="Stats">
            <div slot="content">
                <div class="flex justify-around mb-2">
                    <HpBar bind:data={$Character.attributes["hp"]} />
                </div>
                <div class="flex justify-evenly mb-2">
                    <Speed />
                    <Ca />
                    <Def />
                </div>
                {#if $Character.talents.find((item) => item.name === "Melhor da turma")}
                    <div in:slide out:slide>
                        <Accordion>
                            <label>
                                Atributo para o CA:
                                <select
                                    class="uppercase bg-zinc-800 p-1"
                                    bind:value={$Character.attributes["ac"].use}
                                >
                                    <option value="agi">AGI</option>
                                    <option value="int">INT</option>
                                    <option value="for">FOR</option>
                                </select>
                            </label>
                        </Accordion>
                    </div>
                {/if}
            </div>
        </Panel>
        <Panel title="habilidades">
            <div slot="content">
                <div>
                    <div class="flex justify-evenly">
                        {#if $Character.skills[0]}
                            <Ability bind:data={$Character.skills[0]} />
                        {/if}
                        {#if $Character.skills[1]}
                            <Ability bind:data={$Character.skills[1]} />
                        {/if}
                    </div>
                    <button
                        on:click={() => {
                            modalElement.showModal();
                            modalToShow = "inv_ability";
                        }}
                        class="btn-success mt-2">Trocar Habilidades</button
                    >
                </div>
                <div></div>
            </div>
        </Panel>
        <Panel height="h-fit" title="Combate">
            <div slot="content">
                <div class="flex flex-col justify-between">
                    <div class="flex justify-between items-center">
                        <button
                            on:click={() => {
                                inCombatMode = !inCombatMode;
                                //@ts-expect-error
                                if (inCombatMode) onCombatStart.trigger();
                                //@ts-expect-error
                                else onCombatEnd.trigger();
                            }}
                            class={inCombatMode
                                ? "bg-[#f86b10]/80 w-40 h-12 mb-2 polygonR cursor-pointer font-semibold transition-all"
                                : "bg-[#f86b10]/30 w-40 h-12 mb-2 polygonL cursor-pointer font-light transition-all"}
                            >Modo de combate {inCombatMode
                                ? "ON"
                                : "OFF"}</button
                        >
                        <p class="flex flex-col ml-8 capitalize">
                            Turns
                            <span class="m-auto">{turnCount}</span>
                        </p>
                    </div>
                    <div class="flex justify-between my-1">
                        <button
                            disabled={!inCombatMode}
                            on:click={() => {
                                if (turnStarted) {
                                    //@ts-expect-error
                                    onTurnEnd.trigger();
                                    turnStarted = false;
                                } else {
                                    //@ts-expect-error
                                    onTurnStart.trigger();
                                    turnStarted = true;
                                }
                            }}
                            class={`p-2 text-sm polygonR h-8 active:bg-[#f86b10]/80 disabled:bg-[#f86b10]/20 disabled:text-gray-400 transition-all ${
                                turnStarted
                                    ? "polygonR bg-[#f86b10]/80"
                                    : "polygonL bg-[#f86b10]/40"
                            }`}
                            >{turnStarted
                                ? "Encerrar Turno"
                                : "Começar Turno"}</button
                        >
                    </div>
                    <hr class="border-orange-900 my-2" />
                    <div>
                        <label>
                            Tipo de cover:
                            <select
                                id="cover"
                                bind:value={coverSelected}
                                on:change={onSelectCover}
                                class="uppercase bg-zinc-800 p-1"
                            >
                                <option value="heavy">Pesado</option>
                                <option value="medium">Medio</option>
                                <option value="light">Leve</option>
                                <option value="none">Nem um</option>
                            </select>
                        </label>
                        {#if coverSelected !== "none"}
                            <div in:slide out:slide class="mt-2">
                                <HpBar isChar={false} bind:data={coverHp} />
                            </div>
                        {/if}
                        <hr class="border-orange-900 my-2" />
                        <div class="flex justify-between items-center mb-2">
                            <span>Buffs e Debuffs</span>
                            <button class="btn-success">+ </button>
                        </div>
                        <!-- Colocar buffs e Debuffs aqui -->
                    </div>
                </div>
            </div></Panel
        >
    </div>
    <!-- Center Panel -->
    <div class="w-full h-[95vh] px-2 pt-1 pb-2">
        <Panel height="h-full" title="Taletos">
            <div slot="content" class="h-full flex flex-col items-end">
                <button
                    on:click={() => {
                        modalElement.showModal();
                        modalToShow = "inv_talents";
                    }}
                    class="btn-success mb-2">Adicionar</button
                >
                {#if $Character.talents}
                    <div class="h-[52rem] overflow-y-auto overflow-x-hidden">
                        {#each $Character.talents as talent, i}
                            <div in:slide out:slide>
                                <ItemPanel
                                    bind:data={talent}
                                    iconClass="w-10"
                                    bg="bg-zinc-900"
                                >
                                    <button
                                        class="btn-error mb-2 ml-1"
                                        on:click={() => {
                                            Character.update((c) => {
                                                c.talents.splice(i, 1);
                                                return c;
                                            });
                                        }}>Remover</button
                                    >
                                </ItemPanel>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </Panel>
    </div>
    <!-- Right Panel -->
    <div class="w-full h-[95vh] px-2 pt-1 pb-2 overflow-y-clip">
        <Panel height="h-full" title="Inventario">
            <div slot="content" class="h-full flex flex-col items-end">
                <TabGroup
                    class="flex w-full mb-2 justify-around items-center bg-zinc-900 h-10 polygonR capitalize"
                >
                    <Tab id={0} title="Equipados" />
                    <Tab id={1} title="Arsenal">
                        <div class="flex w-full justify-end mb-1">
                            <button
                                on:click={() => {
                                    modalElement.showModal();
                                    modalToShow = "inv_weapons";
                                }}
                                class="btn-success">Adicionar</button
                            >
                        </div>
                    </Tab>
                    <Tab id={2} title="Equipamentos">
                        <div class="flex w-full justify-end mb-1">
                            <button
                                on:click={() => {
                                    modalElement.showModal();
                                    modalToShow = "inv_equipment";
                                }}
                                class="btn-success">Adicionar</button
                            >
                        </div>
                        {#if $Character.inventory.equipments}
                            <div
                                class="h-[52rem] overflow-y-auto overflow-x-hidden"
                            ></div>
                        {/if}
                    </Tab>
                </TabGroup>
            </div>
        </Panel>
    </div>
</div>
<!-- Tool bar -->
<div
    class="w-full h-[4.5vh] bg-black text-white flex items-center justify-between p-2"
>
    <button
        class="bg-[#f86b10]/80 w-32 h-8 polygonR font-semibold transition-all active:bg-[#f86b10]"
        on:click={() => {
            modalElement.showModal();
            modalToShow = "dossier";
        }}>Dossier</button
    >
    <button
        class="bg-[#f86b10]/80 w-8 h-8 polygonL font-semibold transition-all active:bg-[#f86b10]"
        on:click={() => {
            modalElement.showModal();
            modalToShow = "settings";
        }}
    >
        <Icon class="m-auto" icon="material-symbols:settings" width={24} />
    </button>
</div>

<!-- Show Modals -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="bg-zinc-900 text-white p-4 backdrop:bg-zinc-950/90 open:transition-all polygonL"
    bind:this={modalElement}
    on:click={() => {
        if (mouseInsideModal) return;

        modalElement.close();
    }}
>
    {#if modalToShow === "dossier"}
        <Dossier
            dbClient={{ session: data.session, supabase: data.supabase }}
            bind:mouseInside={mouseInsideModal}
            bind:dossier={$Character.dossier}
        />
    {/if}
    {#if modalToShow === "settings"}
        <Settings />
    {/if}
    {#if modalToShow === "inv_talents"}
        <TalentsList
            bind:mouseInside={mouseInsideModal}
            data={data.defaults.charTalents}
        />
    {/if}
    {#if modalToShow === "inv_equipment"}
        <EquipmentsList
            bind:mouseInside={mouseInsideModal}
            data={{ ...data.defaults.equipments }}
        />
    {/if}
    {#if modalToShow === "inv_weapons"}
        <EquipmentsList
            index={1}
            bind:mouseInside={mouseInsideModal}
            data={{ ...data.defaults.equipments }}
        />
    {/if}
    {#if modalToShow === "inv_ability"}
        <SkillList
            skillSlot={0}
            bind:mouseInside={mouseInsideModal}
            data={data.defaults.skills}
        />
    {/if}
</dialog>

<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 4rem;
        --toastContainerLeft: calc(50vw - 4rem);
    }
</style>
