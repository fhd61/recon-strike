<script lang="ts">
    export let title: string;
    export let shortName: string;
    export let id: string;
</script>

<div class="flex flex-col justify-center items-center text-center w-20">
    <label for={id} class="flex flex-col mb-1">
        <p class="capitalize text-xs">{title}</p>
        <span class="uppercase text-xs font-bold italic opacity-40">{shortName}</span>
    </label>

    <input
        type="number"
        class="w-10 bg-zinc-900 appearance-none text-center polygonR -translate-x-[0.15rem]"
        value="1"
        max="16"
        min="0"
        name={id}
        {id}
    />
</div>

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>
