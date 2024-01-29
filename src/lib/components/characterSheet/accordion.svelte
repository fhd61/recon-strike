<script>
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";

    export let label = "Modificadores";
    export let icon = "";
    export let iconClass = "w-12 -translate-y-1 mr-2";
    export let open = false;
    export let closeOnInteract = false;
</script>

<button
    on:click={() => (open = !open)}
    class={`w-full flex justify-between items-center ${icon ? "" : "p-3"}`}
>
    <div class="flex items-center text-left">
        {#if icon}
            <img src={icon} class={iconClass} alt="" />
        {/if}
        <span>{label}</span>
    </div>
    <Icon
        icon="bx:up-arrow"
        rotate={2}
        class={` ${open ? "rotate-180" : ""} transition-all ml-2`}
    />
</button>
{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <section
        in:slide out:slide 
        on:click={() => {
            if (!closeOnInteract) return;

            open = !open;
        }}
    >
            <div class="p-2 text-left">
                <slot />
            </div>
    </section>
{/if}
