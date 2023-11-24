<script lang="ts">
    import type { IAttribute } from "../interface/IBaseAttribute";

    export let data: IAttribute;
    
</script>

<div class="flex flex-col items-center justify-center w-[5.5rem]">
    <p class="capitalize text-xs">{data.name}</p>
    <p class="uppercase text-xs font-bold italic opacity-40">
        {data.shortName}
    </p>

    <input
        bind:value={data.value}
        type="number"
        class="w-10 bg-zinc-900 appearance-none text-center polygonR -translate-x-[0.15rem]"
        max="16"
        min="0"
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
