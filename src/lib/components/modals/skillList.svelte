<script lang="ts">
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";
    import { CharacterUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import type { ISkill } from "$lib/types/interface/ISkill";

    type tab = { title: string; section: "tech" | "security" | "medical" };

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

    let index = 0;
    const tabs: tab[] = [
        { title: "Demolição", section: "tech" },
        { title: "Seguraça", section: "security" },
        { title: "Medicina", section: "medical" },
    ];

    function equipSkill(slot: number, skill: ISkill) {
        console.log({ slot, skill });
        CharacterUtils.swapSkill(slot, skill);
        console.log($CharacterSheet.skills);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
    <TabGroup
        selectedTab={0}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Slot 1">
            <TabGroup
                selectedTab={0}
                class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
            >
                {#each tabs as { title, section }, i}
                    <Tab id={i} {title}>
                        <TabGroup
                            selectedTab={0}
                            class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
                        >
                            <Tab id={0} title="Padrão">
                                {#each data[section] as ability}
                                    <ItemPanel
                                        iconClass="w-10"
                                        data={ability}
                                        on:EquipItem={() =>
                                            equipSkill(0, ability)}
                                    />
                                {/each}
                            </Tab>
                            <Tab id={1} title="Melhorias">
                                {#each data.upgrades[section] as ability}
                                    <ItemPanel
                                        iconClass="w-10"
                                        data={ability}
                                        on:EquipItem={() =>
                                            equipSkill(0, ability)}
                                    />
                                {/each}
                            </Tab>
                        </TabGroup>
                    </Tab>
                {/each}
            </TabGroup>
        </Tab>
        <Tab id={1} title="Slot 2">
            <TabGroup
                selectedTab={0}
                class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
            >
                {#each tabs as { title, section }, i}
                    <Tab id={i} {title}>
                        <TabGroup
                            selectedTab={0}
                            class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
                        >
                            <Tab id={0} title="Padrão">
                                {#each data[section] as ability}
                                    <ItemPanel
                                        iconClass="w-10"
                                        data={ability}
                                        on:EquipItem={() =>
                                            equipSkill(1, ability)}
                                    />
                                {/each}
                            </Tab>
                            <Tab id={1} title="Melhorias">
                                {#each data.upgrades[section] as ability}
                                    <ItemPanel
                                        iconClass="w-10"
                                        data={ability}
                                        on:EquipItem={() =>
                                            equipSkill(1, ability)}
                                    />
                                {/each}
                            </Tab>
                        </TabGroup>
                    </Tab>
                {/each}
            </TabGroup>
        </Tab>
    </TabGroup>
</div>
