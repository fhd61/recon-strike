<script lang="ts">
    import Accordion from "./accordion.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils, EAttributeUtils, StringUtils } from "$lib/utils";
    import { CharacterSheet } from "$lib/store/character";
    import { rollDice } from "$lib/diceRoller";
    import type { IAttribute } from "$lib/types/interface/IBaseAttribute";

    export let data: IWeapon;
    export let bg = "bg-zinc-950";

    function rollHit() {
        let dice = StringUtils.parseDiceNotation(data.hit);
        let att = data.modifier.toLocaleLowerCase().split("/");
        let mod = CharacterUtils.getAttribute(
            EAttributeUtils.stringToAttribute(att[0]),
        ) as IAttribute;
        let hasTalent = $CharacterSheet.talents.find(
            (t) => t.name == "Campeão de tiro",
        );

        if (hasTalent) {
            console.log(
                rollDice(data.name, dice.sides, [mod.value], dice.rollTimes),
            );
        } else {
            let div = Number.parseInt(att[1]);

            console.log(
                rollDice(
                    data.name + " | Acerto",
                    dice.sides,
                    [mod.value === 1 ? mod.value : Math.floor(mod.value / div)],
                    dice.rollTimes,
                ),
            );
        }
    }

    function rollDamage() {
        let dice = StringUtils.parseDiceNotation(data.damage);
        let att = data.modifier.toLocaleLowerCase().split("/");
        let mod = CharacterUtils.getAttribute(
            EAttributeUtils.stringToAttribute(att[0]),
        ) as IAttribute;
        let hasTalent = $CharacterSheet.talents.find(
            (t) => t.name == "Tiro fatal",
        );
        let bonus = hasTalent ? [mod.value === 1 ? mod.value : Math.floor(mod.value / 2)] : []

        console.log(
            rollDice(data.name + " | Dano", dice.sides, bonus, dice.rollTimes),
        );
    }
</script>

<div class={`w-[45rem] flex flex-col ${bg} px-2 m-1 polygonL`}>
    <Accordion
        closeOnInteract={false}
        iconClass="w-10 h-10 object-scale-down mr-2 -translate-y-1"
        icon={data.icon}
        label={data.name}
    >
        <div class="flex flex-col items-start">
            <div class="grid grid-flow-col gap-x-4 text-sm">
                <p>Dano: {data.damage}</p>
                <p>Acerto: {data.hit} + {data.modifier}</p>
                <p>Critico: {data.critMult}</p>
                <p>Alcance: {data.range}m</p>
            </div>
            <div class="mt-2 flex justify-between">
                <button
                    on:click={rollHit}
                    class="bg-orange-700 hover:bg-orange-900 transition-all w-fit h-full p-2 polygonL"
                    >Rolar Acerto</button
                >
                <button
                    on:click={rollDamage}
                    class="bg-orange-700 hover:bg-orange-900 transition-all w-fit h-full p-2 polygonL mx-3"
                    >Rolar dano</button
                >
                <button
                    on:click={() =>{
                        rollHit()
                        rollDamage()
                    }}
                    class="bg-orange-700 hover:bg-orange-900 transition-all w-fit h-full p-2 polygonL"
                    >Rolar Acerto + Rolar dano</button
                >
            </div>
            <div class="mt-2">
                <slot />
            </div>
        </div>
    </Accordion>
</div>
