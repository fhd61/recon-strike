<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import Talent from "../characterSheet/talent.svelte";
    import { CharacterSheet } from "$lib/store/character";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils } from "$lib/utils";

    export let data: { armor: IItem[]; fireArms: IWeapon[]; melee: IWeapon[] };
    export let mouseInside: Boolean = false;

    let currentShowingContent = "items";

    function handleTabClicked(tabIndex: number) {
        mouseInside = true;
        const tabName = ["items", "weapons", "create_item", "create_weapons"];

        currentShowingContent = tabName[tabIndex];
    }
</script>

<div class="flex justify-around mb-1 bg-zinc-950 h-10 polygonR capitalize">
    <button
        class={`hover:bg-orange-800 active:bg-orange-600 w-full ${
            currentShowingContent === "items"
                ? "bg-orange-600 font-semibold"
                : ""
        } transition-all`}
        on:click={() => handleTabClicked(0)}>Colete</button
    >
    <button
        class={`hover:bg-orange-800 active:bg-orange-600 w-full ${
            currentShowingContent === "weapons"
                ? "bg-orange-600 font-semibold"
                : ""
        } transition-all`}
        on:click={() => handleTabClicked(1)}>Armas</button
    >
    <button
        class={`hover:bg-orange-800 active:bg-orange-600 w-full ${
            currentShowingContent === "create_item"
                ? "bg-orange-600 font-semibold"
                : ""
        } transition-all`}
        on:click={() => handleTabClicked(2)}>Criar Item</button
    >
    <button
        class={`hover:bg-orange-800 active:bg-orange-600 w-full ${
            currentShowingContent === "create_weapons"
                ? "bg-orange-600 font-semibold"
                : ""
        } transition-all`}
        on:click={() => handleTabClicked(3)}>Criar Arma</button
    >
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    {#if currentShowingContent === "items"}
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
    {:else if currentShowingContent === "weapons"}
        <div></div>
    {:else if currentShowingContent === "create_item"}
        <div></div>
    {:else if currentShowingContent === "create_weapons"}
        <div></div>
    {/if}
</div>
