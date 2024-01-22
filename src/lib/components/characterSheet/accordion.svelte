<script>
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";

    export let label = "Modificadores";
    export let icon = "";
    export let iconClass = "w-12 -translate-y-1 mr-2";
    export let open = false;
    export let closeOnInteract = false;
    let props = $$restProps
</script>

<button
    on:click={() => (open = !open)}
    class={`w-full flex justify-between items-center mt-2 ${icon ? "" : "p-3"} ${props.class}`}
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
