<script lang="ts">
    import * as Collapsible from "$lib/components/ui/collapsible";
    import Icon from "@iconify/svelte";
    import Atribute from "$lib/components/atributte.svelte";
    import Panel from "$lib/components/panel.svelte";
    import HpBar from "$lib/components/hpBar.svelte";
    import Stat from "$lib/components/stat.svelte";
    import {
        CharacterSheet as Character,
        type ICharacter,
    } from "$lib/store/character";
    import { afterUpdate, onMount } from "svelte";
    import Dossier from "$lib/components/modals/dossier.svelte";
    import Settings from "$lib/components/modals/settings.svelte";
    import Talent from "$lib/components/talent.svelte";
    import type { IItem } from "$lib/interface/IItem";
    import { rollFromString } from "$lib/diceRoller";

    let inCombatMode: Boolean;
    let mouseInsideModal: Boolean;
    let modalElement: HTMLDialogElement;
    let modalToShow: "dossier" | "settings" | "inv_talents" | "inv_equipment";
    let diceRollInput: HTMLInputElement

    onMount(() => {
        let load: ICharacter = JSON.parse(
            localStorage.getItem("character") as string,
        );

        $Character = load;
    });

    afterUpdate(() => {
        localStorage.setItem("character", JSON.stringify($Character));
        console.log(mouseInsideModal);
    });

    let test:IItem = {name:"Akimbo", description: "Pode usar duas armas pequenas ao mesmo tempo -3 de acerto se for duas pistolas, **-4** de acerto se for duas submetralhadoras", icon:"https://i.imgur.com/Tkl0eyo.png"}
</script>

<div class="flex flex-row max-md:flex-col text-white">
    <!-- Left Panel -->
    <div class="w-1/3 h-[95vh] px-2 py-1">
        <Panel title="Rolar Dados">
            <div slot="content" class="flex">
                <button
                    class="bg-zinc-800 w-14 h-8 mr-2 polygonR inline-flex justify-center items-center active:bg-zinc-700"
                    on:click={() => console.log(rollFromString(diceRollInput.value))}
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
                <Atribute bind:data={$Character.attributes["agi"]} />
                <Atribute bind:data={$Character.attributes["for"]} />
                <Atribute bind:data={$Character.attributes["int"]} />
                <Atribute bind:data={$Character.attributes["vig"]} />
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
                </div>
                <Collapsible.Root>
                    <Collapsible.Trigger class="flex justify-between mt-2">
                        <p class="mr-48">Modificadores</p>
                        <Icon icon="bx:up-arrow" rotate={2} />
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                        <p>Defesa = 5</p>
                        <p>CA = VIG + AGI + Defesa * 2</p>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>
        </Panel>
        <Panel title="habilidades">
            <div slot="content">
                <p>Skill 1</p>
                <p>Skill 2</p>
                <Collapsible.Root>
                    <Collapsible.Trigger class="flex justify-between mt-2">
                        <p class="mr-48">Modificadores</p>
                        <Icon icon="bx:up-arrow" rotate={2} />
                    </Collapsible.Trigger>
                    <Collapsible.Content>a</Collapsible.Content>
                </Collapsible.Root>
            </div>
        </Panel>
        <Panel title="Combate">
            <div slot="content">
                <div class="flex justify-between items-center">
                    <button
                        on:click={() => (inCombatMode = !inCombatMode)}
                        class={inCombatMode
                            ? "bg-[#f86b10]/80 w-40 h-9 polygonR cursor-pointer font-semibold transition-all"
                            : "bg-[#f86b10]/30 w-40 h-9 polygonL cursor-pointer font-light transition-all"}
                        >Comba Mode {inCombatMode ? "ON" : "OFF"}</button
                    >
                    <p class="flex flex-col ml-8 capitalize">
                        Turns
                        <span class="m-auto">1</span>
                    </p>
                </div>
                <div class="flex justify-between my-1">
                    <button
                        disabled
                        class="bg-[#f86b10]/30 p-2 text-sm polygonR w-28 h-8 active:bg-[#f86b10]/80 disabled:bg-[#f86b10]/20 disabled:text-gray-400 transition-all"
                        >End Turn</button
                    >
                    <button
                        disabled
                        class="bg-[#f86b10]/30 p-2 text-sm polygonL w-28 h-8 active:bg-[#f86b10]/80 disabled:bg-[#f86b10]/20 disabled:text-gray-400 transition-all"
                        >Start Turn</button
                    >
                </div>
                <Collapsible.Root>
                    <Collapsible.Trigger class="flex justify-between mt-2">
                        <p class="mr-48">Modificadores</p>
                        <Icon icon="bx:up-arrow" rotate={2} />
                    </Collapsible.Trigger>
                    <Collapsible.Content>Cover</Collapsible.Content>
                </Collapsible.Root>
            </div>
        </Panel>
    </div>

    <!-- Center Panel -->
    <div class="w-full h-[95vh] px-2 pt-1 pb-2">
        <Panel title="Taletos" fitAll={true}>
            <div slot="content" class="h-full flex flex-col">
                <button class="ml-[42.7rem]">Add</button>
                <Talent data={test}/>
            </div>
        </Panel>
    </div>

    <!-- Right Panel -->
    <div class="w-full h-[95vh] px-2 pt-1 pb-2">
        <Panel title="Equipamentos" fitAll={true}>
            <div slot="content" class="h-full">
                <Collapsible.Root>
                    <Collapsible.Trigger class="w-full">
                        <div
                            class="flex items-center bg-zinc-900 px-2 polygonL"
                        >
                            <img
                                src="https://i.imgur.com/Tkl0eyo.png"
                                width="52"
                                alt=""
                                class="mr-4"
                            />
                            <h1 class="text-xl flex">Akimbo</h1>
                        </div>
                    </Collapsible.Trigger>
                    <Collapsible.Content
                        class="bg-zinc-900 px-2 py-1 -translate-y-4 polygonL text-sm"
                    >
                        Pode usar duas armas pequenas ao mesmo tempo -3 de
                        acerto se for duas pistolas, -4 de acerto se for duas
                        submetralhadoras
                    </Collapsible.Content>
                </Collapsible.Root>
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
    {/if}
</dialog>
