<script lang="ts">
    import { CharacterSheet } from "$lib/store/character";
    import Icon from "@iconify/svelte";
    import { afterUpdate } from "svelte";

    let valueWithBonus = 0;

    afterUpdate(() => {
        let bonusTotal = 0;
        let agiWithBonus = 0;

        for (let key in $CharacterSheet.attributes["agi"].bonus)
            agiWithBonus += $CharacterSheet.attributes["agi"].bonus[key];

        agiWithBonus += $CharacterSheet.attributes["agi"].value;

        for (let key in $CharacterSheet.attributes["speed"].bonus)
            bonusTotal += $CharacterSheet.attributes["speed"].bonus[key];

        valueWithBonus = $CharacterSheet.attributes["speed"].value + bonusTotal;
        valueWithBonus += Math.ceil(agiWithBonus * 0.5);
    });
</script>

<div class="flex flex-col group">
    <div class={"m-auto z-[1]"}>
        <Icon icon="mdi:run-fast" width="32" />
    </div>
    <div class="relative">
        <p class="text-center text-sm">{valueWithBonus}</p>
        <p
            class="absolute text-sm opacity-0 -translate-x-9 -translate-y-1 group-hover:opacity-100 transition-all"
        >
            Deslocamento
        </p>
    </div>
</div>
