<script>
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";

    export let open = false;
</script>

<button on:click={() => (open = !open)} class="w-full flex justify-between mt-2">
    <span>Modificadores</span>
    <Icon icon="bx:up-arrow" rotate={2} class={` ${open ? "rotate-180" : ""} transition-all`} />
</button>

{#if open}
    <div in:slide out:slide>   
        <slot/>
    </div>
{/if}
