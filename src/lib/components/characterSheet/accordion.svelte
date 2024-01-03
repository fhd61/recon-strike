<script>
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";

    export let label = "Modificadores";
    export let icon = "";
    export let open = false;
    export let closeOnInteract = false;
</script>

<button
    on:click={() => (open = !open)}
    class="w-full flex justify-between items-center mt-2"
>
    {#if icon !== ""}
        <div class="flex items-center text-left">
            <img src={icon} class="w-12 -translate-y-1 mr-2" alt="" />
            <span>{label}</span>
        </div>
        <Icon
            icon="bx:up-arrow"
            rotate={2}
            class={` ${open ? "rotate-180" : ""} transition-all ml-2`}
        />
    {:else}
        <span>{label}</span>
        <Icon
            icon="bx:up-arrow"
            rotate={2}
            class={` ${open ? "rotate-180" : ""} transition-all ml-2`}
        />
    {/if}
</button>
<button
    on:click={() => {
        if (!closeOnInteract) return;

        open = !open;
    }}
>
    {#if open}
        <div in:slide out:slide class="p-2 text-left">
            <slot />
        </div>
    {/if}
</button>
