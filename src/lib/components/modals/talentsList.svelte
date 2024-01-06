<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import Talent from "../characterSheet/itemPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";

    export let data: IItem[];
    export let mouseInside: Boolean = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    {#each data as talent}
        <div>
            <Talent data={talent}>
                <button
                    on:click={() => {
                        CharacterSheet.update((c) => {
                            c.talents.push(talent);
                            return c;
                        });
                    }}>Adicionar</button
                >
            </Talent>
        </div>
    {/each}
</div>
