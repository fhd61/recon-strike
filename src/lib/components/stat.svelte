<script lang="ts">
    import type { IAttribute } from "$lib/interface/IBaseAttribute";
    import { CharacterSheet } from "$lib/store/character";
    import { afterUpdate } from "svelte";

    export let data: IAttribute;
    export let inFront = false;
    export let isAc = false;
    export let acCalcStat: "agi" | "int" | "for" = "agi";

    let valueWithBonus = 0;

    function calcValueWithBonus() {
        let bonusTotal = 0;

        for (let key in data.bonus) bonusTotal += data.bonus[key];

        return data.value + bonusTotal;
    }

    function calcAc(): number {
        let vigValue = $CharacterSheet.attributes["vig"].value;
        let otherValue = $CharacterSheet.attributes[acCalcStat].value;
        let defValue = $CharacterSheet.attributes["def"].value;

        return vigValue + otherValue + defValue * 2;
    }

    CharacterSheet.subscribe((char) => {
        char.attributes["ac"].value = calcAc();
        valueWithBonus = calcValueWithBonus();
    });

    afterUpdate(() => {
        $CharacterSheet.attributes["ac"].value = calcAc();
    });
</script>

<div class="relative flex">
    {#if isAc}
        <span class="bg-black w-12 text-center absolute translate-y-3 text-sm"
            >{$CharacterSheet.attributes["ac"].value}</span
        >
    {:else}
        <span class="bg-black w-12 text-center absolute translate-y-3 text-sm"
            >{data.value}</span
        >
    {/if}
    <div class={`m-auto z-[${inFront ? "1" : "0"}]`}>
        <slot name="icon" />
    </div>
</div>
