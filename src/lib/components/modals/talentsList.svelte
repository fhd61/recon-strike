<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";
    import { CharacterUtils } from "$lib/utils";

    export let data: IItem[];
    export let mouseInside: boolean = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    {#each data as talent}
        <div>
            <ItemPanel
                iconClass="w-12"
                data={talent}
                bind:condition={talent.isEquipped}
                on:EquipItem={() => CharacterUtils.addTalentToChar(talent)}
                on:UnEquipItem={() => CharacterUtils.removeTalentToChar(talent)}
            ></ItemPanel>
        </div>
    {/each}
</div>
