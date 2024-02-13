<script lang="ts">
    import { CharacterSheet } from "$lib/store/character";
    import { onTurnEnd } from "$lib/store/events";
    import type { ISkill } from "$lib/types/interface/ISkill";
    import { CharacterUtils, EAttributeUtils, MathUtils } from "$lib/utils";
    import { afterUpdate } from "svelte";
    import { cubicIn } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { fade, slide } from "svelte/transition";

    export let data: ISkill;
    let isInCooldown = false;
    let cooldonwPercentage = 0;
    let duration = 0;
    let cooldwonTween = tweened(cooldonwPercentage, { easing: cubicIn });

    $: {
        cooldonwPercentage = (data.currentCooldown / data.cooldown) * 100;
        cooldonwPercentage = MathUtils.clamp(cooldonwPercentage, 0, 100);

        cooldwonTween.set(cooldonwPercentage);

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

        if (data.duration === undefined) return;
        duration--;
        duration = MathUtils.clamp(duration, 0, data.duration);

        if (data.hp === undefined && !isInCooldown) {
            for (const key in data.attToModify) {
                const attName = EAttributeUtils.stringToAttribute(key);

                CharacterUtils.removeBonusOfAttribute(attName, data.name);
            }
        }
    });

    function useSkill() {
        if (isInCooldown) return;

        data.currentCooldown = 0;
        isInCooldown = true;

        if (data.duration !== undefined) duration = data.duration;

        if (data.attToModify === undefined) return;

        for (const key in data.attToModify) {
            const attName = EAttributeUtils.stringToAttribute(key);

            console.log(attName);
            console.log(CharacterUtils.getAttribute(attName));
            CharacterUtils.addBonusToAttribute(
                attName,
                data.name,
                data.attToModify[key],
            );
        }

        if (data.hp === undefined) return;

        data.hp.currentValue = data.hp.maxValue;
    }
</script>

<div class="flex flex-col items-center">
    <button disabled={isInCooldown} title={data.description} class="w-32 h-12" on:click={useSkill}>
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
                        {MathUtils.clamp(
                            data.currentCooldown,
                            0,
                            data.cooldown,
                        )}
                    </p>
                {/if}
            </div>
            <div
                class="bg-orange-600/60 h-full"
                style={`width:${$cooldwonTween}%`}
            />
        </div>
    </button>
    {#if data.duration !== undefined && duration != 0}
        <div in:slide out:slide class="flex items-center">
            <p class="text-sm">Duração: {duration}</p>
        </div>
    {/if}
</div>
