<script lang="ts">
    import { CharacterSheet } from "$lib/store/character";
    import Icon from "@iconify/svelte";
    import { afterUpdate } from "svelte";

    let valueWithBonus: number;

    function calcGA() {
        if ($CharacterSheet.attributes["ga"].use === undefined)
            $CharacterSheet.attributes["ga"].use = "agi";

        let userStat: "agi" | "int" | "for" =
            $CharacterSheet.attributes["ga"].use;

        const vigValue = $CharacterSheet.attributes["vig"].value;
        const otherValue = $CharacterSheet.attributes[userStat].value;
        const defValue = $CharacterSheet.attributes["def"].value;

        const finalAc = vigValue + otherValue + defValue * 2;

        $CharacterSheet.attributes["ga"].value = finalAc;
    }

    afterUpdate(() => {
        calcGA();

        let bonusTotal = 0;

        for (let key in $CharacterSheet.attributes["ga"].bonus)
            bonusTotal += $CharacterSheet.attributes["ga"].bonus[key];

        valueWithBonus = $CharacterSheet.attributes["ga"].value + bonusTotal;
    });
</script>

<div class="flex flex-col group">
    <div class="my-1">
        <Icon icon="game-icons:arrows-shield" width="32" />
    </div>
    <div>
        <p class="text-center text-sm mb">{valueWithBonus}</p>
        <p
            class="absolute text-sm opacity-0 translate-x-2 -translate-y-1 group-hover:opacity-100 transition-all"
        >
            GA
        </p>
    </div>
</div>
