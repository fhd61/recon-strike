<script lang="ts">
    import Icon from "@iconify/svelte";
    import Attribute from "$lib/components/characterSheet/atributte.svelte";
    import Panel from "$lib/components/panel.svelte";
    import HpBar from "$lib/components/characterSheet/hpBar.svelte";
    import Stat from "$lib/components/characterSheet/stat.svelte";
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
    import { afterUpdate, onMount } from "svelte";
    import { rollFromString } from "$lib/diceRoller";
    import { toast } from "@zerodevx/svelte-toast";
    import type { ISkill } from "$lib/interface/ISkill";
    import type { IHp } from "$lib/interface/IHp";
    import { slide } from "svelte/transition";
    import {
        onCombatEnd,
        onCombatStart,
        onTurnEnd,
        onTurnStart,
    } from "$lib/store/events";

    import Talent from "$lib/components/characterSheet/talent.svelte";

    export let data;
    let turnCount = 0;
    let inCombatMode: Boolean;
    let mouseInsideModal: Boolean;
    let modalElement: HTMLDialogElement;
    let diceRollInput: HTMLInputElement;
    let modalToShow:
        | "dossier"
        | "settings"
        | "inv_talents"
        | "inv_equipment"
        | "inv_ability" = "dossier";
    let acCalcStat: "agi" | "int" | "for" = "agi";
    let coverSelected: "heavy" | "medium" | "light" | "none" = "none";
    let coverHp: IHp = { maxValue: 30, currentValue: 30, bonus: {} };
    let testSkill: ISkill = {
        name: "Test",
        description: "",
        icon: "https://i.imgur.com/Tkl0eyo.png",
        cooldown: 10,
        currentCooldown: 5,
    };

    //@ts-ignore
    onTurnEnd.on(() => {
        testSkill.currentCooldown += 1;
    });
    //@ts-ignore
    onTurnStart.on(() => {
        turnCount++;
    });
    //@ts-ignore
    onCombatEnd.on(() => {
        turnCount = 0;
    });

    onMount(() => {
        console.log(data)
        window.document.querySelector("#buffs")?.scrollIntoView(true);
        let char = localStorage.getItem("character");
        let accCalcKey = localStorage.getItem("acCalcStat");

        if (accCalcKey === null) {
            localStorage.setItem("acCalcStat", acCalcStat);
        } else {
            acCalcStat = JSON.parse(
                localStorage.getItem("acCalcStat") as "agi" | "int" | "for",
            );
        }

        if (char === null) {
            localStorage.setItem("character", JSON.stringify($Character));
        } else {
            let load: ICharacter = JSON.parse(
                localStorage.getItem("character") as string,
            );
            $Character = load;
        }
    });

    afterUpdate(() => {
        localStorage.setItem("character", JSON.stringify($Character));
        localStorage.setItem("acCalcStat", JSON.stringify(acCalcStat));
    });

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
                    class="w-full bg-zinc-900 appearance-none text-center polygonR"
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
                    <Stat bind:data={$Character.attributes["speed"]}>
                        <Icon icon="ri:run-fill" width={50} slot="icon" />
                    </Stat>
                    <Stat
                        bind:data={$Character.attributes["def"]}
                        inFront={true}
                    >
                        <Icon
                            icon="clarity:shield-line"
                            width={50}
                            slot="icon"
                        />
                    </Stat>
                    <Stat
                        isAc={true}
                        bind:acCalcStat
                        bind:data={$Character.attributes["ac"]}
                    >
                        <Icon
                            icon="game-icons:sword-slice"
                            width={50}
                            slot="icon"
                        />
                    </Stat>
                </div>
                <Accordion>
                    <label>
                        Atributo para o CA:
                        <select
                            class="uppercase bg-zinc-800 p-1"
                            bind:value={acCalcStat}
                        >
                            <option value="agi"
                                >{$Character.attributes["agi"]
                                    .shortName}</option
                            >
                            <option value="int"
                                >{$Character.attributes["int"]
                                    .shortName}</option
                            >
                            <option value="for"
                                >{$Character.attributes["for"]
                                    .shortName}</option
                            >
                        </select>
                    </label>
                </Accordion>
            </div>
        </Panel>
        <Panel title="habilidades">
            <div slot="content">
                <div class="flex justify-evenly">
                    <Ability bind:data={testSkill} />
                    <Ability bind:data={testSkill} />
                </div>
                <Accordion>
                    <button
                        on:click={() => {
                            modalElement.showModal();
                            modalToShow = "inv_ability";
                        }}
                        class="p-1 bg-green-800">Trocar habilidades</button
                    >
                </Accordion>
            </div>
        </Panel>
        <Panel height="h-fit" title="Combate">
            <div slot="content">
                <div class="flex justify-between items-center">
                    <button
                        on:click={() => {
                            inCombatMode = !inCombatMode;
                            //@ts-ignore
                            if (inCombatMode) onCombatStart.trigger();
                            //@ts-ignore
                            else onCombatEnd.trigger();
                        }}
                        class={inCombatMode
                            ? "bg-[#f86b10]/80 w-40 h-9 polygonR cursor-pointer font-semibold transition-all"
                            : "bg-[#f86b10]/30 w-40 h-9 polygonL cursor-pointer font-light transition-all"}
                        >Comba Mode {inCombatMode ? "ON" : "OFF"}</button
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
                            //@ts-ignore
                            onTurnEnd.trigger();
                        }}
                        class="bg-[#f86b10]/50 p-2 text-sm polygonR w-28 h-8 active:bg-[#f86b10]/80 disabled:bg-[#f86b10]/20 disabled:text-gray-400 transition-all"
                        >End Turn</button
                    >
                    <button
                        disabled={!inCombatMode}
                        on:click={() => {
                            //@ts-ignore
                            onTurnStart.trigger();
                        }}
                        class="bg-[#f86b10]/50 p-2 text-sm polygonL w-28 h-8 active:bg-[#f86b10]/80 disabled:bg-[#f86b10]/20 disabled:text-gray-400 transition-all"
                        >Start Turn</button
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
                            <HpBar bind:data={coverHp} />
                        </div>
                    {/if}
                    <hr class="border-orange-900 my-2" />
                    <div class="flex justify-between items-center mb-2">
                        <span>Buffs e Debuffs</span>
                        <button class="w-9 p-1 mr-1 bg-green-800 polygonF"
                            >+
                        </button>
                    </div>
                    <!-- Colocar buffs e Debuffs aqui -->
                </div>
            </div>
        </Panel>
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
                    class="h-8 w-10 bg-green-800 polygonF">Add</button
                >
                {#if $Character.talents}
                    {#each $Character.talents as talent, i}
                        <div in:slide out:slide>
                            <Talent bind:data={talent} bg="bg-zinc-900">
                                <button
                                    on:click={() => {
                                        Character.update((c) => {
                                            c.talents.splice(i, 1);
                                            return c;
                                        });
                                    }}>Remover</button
                                >
                            </Talent>
                        </div>
                    {/each}
                {/if}
            </div>
        </Panel>
    </div>

    <!-- Right Panel -->
    <div class="w-full h-[95vh] px-2 pt-1 pb-2">
        <Panel height="h-full" title="Equipamentos">
            <div slot="content" class="h-full flex flex-col items-end">
                <button
                    on:click={() => {
                        modalElement.showModal();
                        modalToShow = "inv_equipment";
                    }}
                    class="h-8 w-10 bg-green-800 polygonF">Add</button
                >
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
    class="bg-zinc-900 text-white p-4 backdrop:bg-zinc-950/90 open:transition-all"
    bind:this={modalElement}
    on:click={() => {
        if (mouseInsideModal) return;

        modalElement.close();
    }}
>
    {#if modalToShow === "dossier"}
        <Dossier
            bind:mouseInside={mouseInsideModal}
            bind:data={$Character.dossier}
        />
    {:else if modalToShow === "settings"}
        <Settings />
    {:else if modalToShow === "inv_talents"}
        <TalentsList
            bind:mouseInside={mouseInsideModal}
            data={data.defaults.charTalents}
        />
    {:else if modalToShow === "inv_equipment"}
        <EquipmentsList />
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
