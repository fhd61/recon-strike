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

    let inCombatMode: Boolean;
    let dossierModal: HTMLDialogElement;

    onMount(() => {
        let load: ICharacter = JSON.parse(
            localStorage.getItem("character") as string,
        );

        $Character = load;
    });

    afterUpdate(() => {
        localStorage.setItem("character", JSON.stringify($Character));
    });
</script>

<div class="flex flex-row max-md:flex-col text-white">
    <!-- Left Panel -->
    <div class="w-1/3 h-[95vh] px-2 py-1">
        <Panel title="Rolar Dados">
            <div slot="content" class="flex">
                <button
                    class="bg-zinc-800 w-14 h-8 mr-2 polygonR inline-flex justify-center items-center active:bg-zinc-700"
                    on:click={() => console.log($Character)}
                >
                    <Icon icon="fa-solid:dice-d20" width="20" />
                </button>
                <input
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
<div
    class="w-full h-[4.5vh] bg-black text-white flex items-center justify-between p-2"
>
    <button
        class="bg-[#f86b10]/80 w-32 h-8 polygonR font-semibold transition-all active:bg-[#f86b10]"
        on:click={() => dossierModal.showModal()}>Dossier</button
    >
    <button
        class="bg-[#f86b10]/80 w-8 h-8 polygonL font-semibold transition-all active:bg-[#f86b10]"
    >
        <Icon class="m-auto" icon="material-symbols:settings" width={24} />
    </button>
</div>

<dialog
    class="bg-zinc-900 text-white p-4 backdrop:bg-zinc-950/90 open:transition-all"
    bind:this={dossierModal}
>
    <div class="w-[60rem] h-[45rem] flex justify-evenly">
        <div class="flex flex-col">
            <img
                src="https://images.unsplash.com/photo-1701666469271-fd6c65a1e7d5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="w-80 h-72"
                alt=""
            />
        </div>
        <form class="flex flex-col mx-4">
            <div class="flex justify-between mx">
                <div class="flex flex-col">
                    <label for="name">Name</label>
                    <input
                        bind:value={$Character.dossier.name}
                        class="bg-zinc-800 px-2 py-1"
                        placeholder="Character Name"
                        id="name"
                        name="name"
                        type="text"
                    />
                </div>
                <div class="flex flex-col mx-4">
                    <label for="callSing">Call Sing</label>
                    <input
                        bind:value={$Character.dossier.callSign}
                        id="callSing"
                        class="bg-zinc-800 px-2 py-1"
                        placeholder="CS123"
                        name="callSing"
                        type="text"
                    />
                </div>
                <div class="flex flex-col">
                    <label for="level">Level</label>
                    <select
                        bind:value={$Character.dossier.level}
                        id="level"
                        class="bg-zinc-800 w-16 h-8 px-2 py-1"
                        name="level"
                    >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col col-span-3 my-4">
                <label for="bio">Bio</label>
                <textarea
                    bind:value={$Character.dossier.bio}
                    id="bio"
                    class="bg-zinc-800 resize-none px-2 py-1"
                    placeholder="Character biography..."
                    name="notes"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
            <div class="flex flex-col col-span-3">
                <label for="notes">Notes</label>
                <textarea
                    bind:value={$Character.dossier.notes}
                    class="bg-zinc-800 resize-none px-2 py-1"
                    id="notes"
                    placeholder="Additional notes..."
                    name="notes"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
        </form>
    </div>
    <button on:click={() => dossierModal.close()}>Exit</button>
</dialog>
