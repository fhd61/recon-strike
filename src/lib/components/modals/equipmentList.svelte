<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import Talent from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";

    export let data: { armor: IItem[]; fireArms: IWeapon[]; melee: IWeapon[] };
    export let mouseInside: Boolean = false;
</script>

<TabGroup
    groupStyle="flex w-full mb-2 justify-around items-center bg-zinc-900 h-10 polygonR capitalize"
    tabStyle="h-full w-full hover:bg-orange-800 active:bg-orange-600 font-semibold transition-all"
>
    <Tab id={0} title="Colete">
        {#each data.armor as item}
            <div>
                <Talent data={item}>
                    <button
                        on:click={() => CharacterUtils.addItemToInventory(item)}
                        >Adicionar</button
                    >
                </Talent>
            </div>
        {/each}
    </Tab>
    <Tab id={1} title="Armas">
        <div></div>
    </Tab>
    <Tab id={2} title="Criar Item">
        <div></div>
    </Tab>
    <Tab id={3} title="Criar Arma">
        <div></div>
    </Tab>
</TabGroup>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
</div>
