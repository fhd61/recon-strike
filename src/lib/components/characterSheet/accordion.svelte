<script lang="ts">
    import Icon from "@iconify/svelte";

    export let label = "Modificadores";
    export let icon = "";
    export let iconClass = "w-9 -translate-y-1 mr-2";
    export let open = false;
    export let closeOnInteract = false;

    let detailsElement: HTMLDetailsElement;

    function closeOnClickContent() {
        if (!closeOnInteract) return;

        detailsElement.open = false;
    }
</script>

<details bind:this={detailsElement} bind:open>
    <summary class="flex justify-between items-center p-1">
        <div class="flex items-center">
            {#if icon}
                <img src={icon} class={iconClass} alt="" />
            {/if}
            <p class="ml-2">{label}</p>
        </div>
        <Icon
            icon="bxs:down-arrow"
            class={` ${open ? "rotate-180" : ""} transition-all ml-2`}
        />
    </summary>
    {#key open}
        <div class="mt-1">
            <button on:click={closeOnClickContent}>
                <slot />
            </button>
        </div>
    {/key}
</details>
