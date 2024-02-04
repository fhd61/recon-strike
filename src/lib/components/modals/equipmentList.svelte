<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import WeaponPanel from "../characterSheet/weaponPanel.svelte";

    export let data: { armor: IItem[]; fireArms: IWeapon[]; melee: IWeapon[] };
    export let mouseInside: boolean = false;
    export let index = 0
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={() => (mouseInside = true)}>
    <TabGroup
        selectedTab={index}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Colete">
            {#each data.armor as item}
                <div>
                    <ItemPanel iconClass="w-9 h-19 object-scale-down" data={item}>
                        <button
                            class="btn-success ml-1 mb-2"
                            on:click={() =>
                                CharacterUtils.addItemToInventory(item)
                                }
                            >Adicionar</button
                        >
                    </ItemPanel>
                </div>
            {/each}
        </Tab>
        <Tab id={1} title="Armas">
            {#each data.fireArms as item}
                <WeaponPanel showDices={false} data={item}>
                    <button
                        class="btn-success ml-1 mb-2"
                        on:click={() =>
                            CharacterUtils.addItemToInventory(item)
                            }
                        >Adicionar</button
                    >
                </WeaponPanel>
            {/each}
        </Tab>
        <Tab id={2} title="Criar Item">
            <div></div>
        </Tab>
        <Tab id={3} title="Criar Arma">
            <div></div>
        </Tab>
    </TabGroup>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
></div>
