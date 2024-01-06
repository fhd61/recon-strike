<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { writable, type Writable } from "svelte/store";

    export let groupStyle = "";
    export let tabStyle = "";
    export let selectedTab = 0;

    let selectedTabStore = writable(selectedTab);
    let tabGroup: HTMLDivElement;

    $: $selectedTabStore = selectedTab;
    $: updateValue($selectedTabStore);
    $: titles.sort((a, b) => a.id - b.id);

    function updateValue(value: number) {
        selectedTab = value;
    }

    let titles: Array<{ id: number; title: string }> = [];

    setContext<Writable<number>>("selectedTab", selectedTabStore);
    setContext<{
        register(id: number, title: string): void;
        unregister(id: number): void;
        update(id: number, title: string): void;
    }>("tabTitles", { register, unregister, update });

    function register(id: number, title: string) {
        titles.push({ id, title });
        titles = titles;
    }

    function unregister(id: number) {
        const index = titles.findIndex((title) => title.id === id);

        if (index > -1) {
            titles.splice(index, 1);
            titles = titles;
        }
    }

    function update(id: number, title: string) {
        const index = titles.findIndex((title) => title.id === id);

        titles[index].title = title;
        titles = titles;
    }

</script>

<div class={groupStyle}>
    {#each titles as { id, title }}
        <button
            class:selected={$selectedTabStore === id}
            class={tabStyle}
            on:click={() => ($selectedTabStore = id)}>{title}</button
        >
    {/each}
</div>

<slot {selectedTab} />

<style>
    button.selected {
        @apply bg-orange-700;
    }
</style>
