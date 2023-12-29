<script lang="ts">
    import type { IItem } from "$lib/interface/IItem";
    import Talent from "../characterSheet/talent.svelte";
    import { CharacterSheet } from "$lib/store/character";

    export let data: IItem[];
    export let store: IItem[];
    export let mouseInside: Boolean = false;

    let showToolTip = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    {#each data as talent}
        <div
            on:mouseenter={() => (showToolTip = true)}
            on:mouseleave={() => (showToolTip = false)}
        >
            <Talent data={talent}>
                <button
                    on:click={() => {
                        CharacterSheet.update((c) => {
                            c.talents.push(talent)
                            return c
                        })
                    }}>Adicionar</button
                >
            </Talent>
        </div>
    {/each}
</div>
