<script lang="ts">
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import { CharacterUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import type { ISkill } from "$lib/types/interface/ISkill";
    import Accordion from "../characterSheet/accordion.svelte";

    export let data: {
        tech: ISkill[];
        security: ISkill[];
        medical: ISkill[];
        upgrades: {
            tech: ISkill[];
            security: ISkill[];
            medical: ISkill[];
        };
    };

    export let mouseInside: boolean = false;
    export let skillSlot = 0;
    let index = 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={() => (mouseInside = true)}>
    <TabGroup
        selectedTab={skillSlot}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Slot 1">
            <TabGroup
                selectedTab={index}
                class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
            >
                <Tab id={0} title="Demolição">
                    <Accordion class="bg-zinc-900" label="Padrão">
                        <div>
                            {#each data.tech as skill}
                                <ItemPanel
                                    iconClass="w-10"
                                    data={{ ...skill }}
                                >
                                <button>Equipar</button>
                                </ItemPanel>
                            {/each}
                        </div>
                    </Accordion>
                    <Accordion label="Upgrades">
                        <div>
                            {#each data.upgrades.tech as skill}
                                <ItemPanel
                                    iconClass="w-10"
                                    data={{ ...skill }}
                                />
                            {/each}
                        </div>
                    </Accordion>
                </Tab>
                <Tab id={1} title="Medicina">
                    <div>
                        {#each data.medical as skill}
                            <ItemPanel iconClass="w-10" data={{ ...skill }} />
                        {/each}
                    </div>
                </Tab>
                <Tab id={2} title="Segurança">
                    <div>
                        {#each data.security as skill}
                            <ItemPanel iconClass="w-10" data={{ ...skill }} />
                        {/each}
                    </div>
                </Tab>
            </TabGroup>
        </Tab>
        <Tab id={1} title="Slot 2">
            <TabGroup
                selectedTab={index}
                class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
            >
                <Tab id={0} title="Demolição">
                    <Accordion class="bg-zinc-900" label="Padrão">
                        <div>
                            {#each data.tech as skill}
                                <ItemPanel
                                    iconClass="w-10"
                                    data={{ ...skill }}
                                />
                            {/each}
                        </div>
                    </Accordion>
                    <Accordion label="Upgrades">
                        <div>
                            {#each data.upgrades.tech as skill}
                                <ItemPanel
                                    iconClass="w-10"
                                    data={{ ...skill }}
                                />
                            {/each}
                        </div>
                    </Accordion>
                </Tab>
                <Tab id={1} title="Medicina">
                    <div>
                        {#each data.tech as skill}
                            <ItemPanel iconClass="w-10" data={{ ...skill }} />
                        {/each}
                    </div>
                </Tab>
                <Tab id={2} title="Segurança">
                    <div>
                        {#each data.tech as skill}
                            <ItemPanel iconClass="w-10" data={{ ...skill }} />
                        {/each}
                    </div>
                </Tab>
            </TabGroup>
        </Tab>
    </TabGroup>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
></div>
