<script>
    import * as Collapsible from "$lib/components/ui/collapsible";
    import { Toggle } from "$lib/components/ui/toggle";
    import Icon from "@iconify/svelte";
    import Atributte from "$lib/components/atributte.svelte";
    import Panel from "$lib/components/panel.svelte";
    import HpBar from "$lib/components/hpBar.svelte";
    import Stat from "$lib/components/stat.svelte";
</script>

<div class="flex flex-row max-md:flex-col text-white">
    <!-- Left Panel -->
    <div class="w-1/3 h-screen px-2 py-1">
        <Panel title="Rolar Dados">
            <div slot="content" class="flex">
                <button
                    class="bg-zinc-800 w-14 h-8 mr-2 polygonR inline-flex justify-center items-center active:bg-zinc-700"
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
            <div slot="content" class="flex">
                <Atributte title="Intelecto" shortName="int" id="int" />
                <Atributte title="Agilidade" shortName="agi" id="agi" />
                <Atributte title="Força" shortName="for" id="for" />
                <Atributte title="Vigor" shortName="vig" id="vig" />
            </div>
        </Panel>
        <Panel title="Stats">
            <div slot="content">
                <div class="flex justify-around mb-2">
                    <HpBar currentValue={30} maxValue={100} />
                </div>
                <div class="flex justify-evenly mb-2">
                    <Stat>
                        <Icon icon="ri:run-fill" width={50} slot="icon" />
                    </Stat>
                    <Stat inFront={true}>
                        <Icon
                            icon="clarity:shield-line"
                            width={50}
                            slot="icon"
                        />
                    </Stat>
                </div>
                <Collapsible.Root>
                    <Collapsible.Trigger class="flex justify-between">
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
            </div>
        </Panel>
        <Panel title="Combate">
            <div slot="content">
                <div class="flex justify-center items-center">
                    <Toggle variant="outline">Modo de combate</Toggle>
                    <p class="flex flex-col ml-8">
                        Turnos<span class="m-auto">1</span>
                    </p>
                </div>
            </div>
        </Panel>
        <Panel title="Histórico de dados">
            <div slot="content">
                <p>roladas</p>
            </div>
        </Panel>
    </div>

    <!-- Center Panel -->
    <div class="w-full h-screen px-2 pt-1 pb-2">
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
    <div class="w-full h-screen px-2 pt-1 pb-2">
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
