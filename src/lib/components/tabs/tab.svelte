<script lang="ts">
    import { getContext, onDestroy, setContext } from "svelte";
    import type { Writable } from "svelte/store";

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

<div>
    {#if id === $selectedTab}
        <slot />
    {/if}
</div>
