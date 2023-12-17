<script lang="ts">
    import { rollDice } from "$lib/diceRoller";
    import { toast } from '@zerodevx/svelte-toast'
    import type { IAttribute } from "../interface/IBaseAttribute";

    export let data: IAttribute;

    function RollAttribute() {
        let bonus = [data.value];

        for (let key in data.bonus) 
            bonus.push(data.bonus[key]);

        let res = rollDice(data.name, 20, bonus);
        toast.push(`${res.name}<br>${res.summery}`)
    }
</script>

<div class="flex flex-col items-center justify-center w-[5.5rem]">
    <button class="capitalize text-xs hover:text-[#c6560d] active:text-orange-600 transition-all" on:click={() => RollAttribute()}
        >{data.name}</button
    >
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
