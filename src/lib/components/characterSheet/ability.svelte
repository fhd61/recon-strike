<script lang="ts">
    import { CharacterSheet } from "$lib/store/character";
    import { onTurnEnd } from "$lib/store/events";
    import type { ISkill } from "$lib/types/interface/ISkill";
    import { MathUtils } from "$lib/utils";
    import { cubicIn } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { fade } from "svelte/transition";

    export let data: ISkill;
    let isInCooldown = false;
    let cooldonwPercentage = 0;
    let tweenedValue = tweened(cooldonwPercentage, { easing: cubicIn });
    $: {
        cooldonwPercentage = (data.currentCooldown / data.cooldown) * 100;
        cooldonwPercentage = MathUtils.clamp(cooldonwPercentage, 0, 100);

        tweenedValue.set(cooldonwPercentage);

        if (cooldonwPercentage == 100) isInCooldown = false;
    }
    
    //@ts-expect-error
    onTurnEnd.on(() => {
        let cdr = 1;

        cdr += $CharacterSheet.talents.reduce((_, talent) => {
            if (
                talent.attToModify === undefined ||
                !("cdr" in talent.attToModify)
            )
                return 0;

            return talent.attToModify["cdr"];
        }, 0)!;

        cdr += $CharacterSheet.inventory.equipments.reduce((_, equipment) => {
            if (
                equipment.attToModify === undefined ||
                !("cdr" in equipment.attToModify)
            )
                return 0;

            return equipment.attToModify["cdr"];
        }, 0)!;
        
        data.currentCooldown += cdr;
    });

    function checkForTalent(talent: "Especialista em Habilidades") {
        return $CharacterSheet.talents.find((t) => t.name == talent);
    }
</script>

<button
    title={data.description}
    class="w-32 h-12"
    on:click={() => {
        if (isInCooldown) return;

        data.currentCooldown = 0;
        isInCooldown = true;
    }}
>
    <div class="w-full h-full bg-orange-900 polygonL relative">
        <div class="relative">
            <img
                src={data.icon}
                class={`h-12 p-1 z-[1] absolute translate-x-10 ${
                    isInCooldown ? "-translate-y-2" : "-translate-y-1"
                } transition-all`}
                alt={data.name}
            />
            {#if isInCooldown}
                <p
                    in:fade
                    out:fade
                    class="w-12 text-center absolute translate-x-[2.5rem] translate-y-7"
                >
                    {MathUtils.clamp(data.currentCooldown, 0, data.cooldown)}
                </p>
            {/if}
        </div>
        <div
            class="bg-orange-600/60 h-full"
            style={`width:${$tweenedValue}%`}
        />
    </div>
</button>
