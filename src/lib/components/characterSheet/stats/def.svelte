<script lang="ts">
    import { CharacterSheet } from "$lib/store/character";
    import Icon from "@iconify/svelte";
    import { afterUpdate } from "svelte";

    let valueWithBonus = 0;

    afterUpdate(() => {
        let bonusTotal = 0;

        for (let key in $CharacterSheet.attributes["def"].bonus)
            bonusTotal += $CharacterSheet.attributes["def"].bonus[key];

        valueWithBonus = $CharacterSheet.attributes["def"].value + bonusTotal;
    });
</script>

<div class="flex flex-col group">
    <div class={"m-auto z-[1]"}>
        <Icon icon="game-icons:chest-armor" width="32" />
    </div>
    <div>
        <p class="text-center text-sm">{valueWithBonus}</p>
        <p
            class="absolute text-sm opacity-0 -translate-x-3 -translate-y-1 group-hover:opacity-100 transition-all"
        >
            Defesa
        </p>
    </div>
</div>
