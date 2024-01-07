<script lang="ts">
    import { getContext, onDestroy, setContext } from "svelte";
    import type { Writable } from "svelte/store";
    import { fade, fly, slide } from "svelte/transition";

    export let title: string;
    export let id: number;

    let selectedTab = getContext<Writable<number>>("selectedTab");
    let tabTitles = getContext<{
        register(id: number, title: string): void;
        unregister(id: number): void;
        update(id: number, title: string): void;
    }>("tabTitles");

    tabTitles.register(id, title);

    $: tabTitles.update(id, title);

    onDestroy(() => {
        tabTitles.unregister(id);
    });
</script>

{#if id === $selectedTab}
    <div
        in:slide={{ duration: 100, axis: "x" }}
        out:slide={{ duration: 100, axis: "x" }}
    >
        <slot />
    </div>
{/if}
