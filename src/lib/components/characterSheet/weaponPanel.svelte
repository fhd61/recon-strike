<script lang="ts">
    import Accordion from "./accordion.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils, EAttributeUtils, StringUtils } from "$lib/utils";
    import { CharacterSheet } from "$lib/store/character";
    import { rollDice } from "$lib/diceRoller";
    import type { IAttribute } from "$lib/types/interface/IBaseAttribute";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";

    export let data: IWeapon;
    export let showDices: boolean = true;
    export let bg = "bg-zinc-950";

    function rollHit() {
        let dice = StringUtils.parseDiceNotation(data.hit);

        let attName = data.modifier.toLocaleLowerCase().split("/");
        let att = EAttributeUtils.stringToAttribute(attName[0]);
        let mod = (CharacterUtils.getAttribute(att) as IAttribute).value;

        if (!checkForTalent("Campeão de tiro")) mod = Math.ceil(mod / 2);

        const res = rollDice(
            data.name + " | Acerto",
            dice.sides,
            [mod],
            dice.rollTimes,
        );

        toast.push(`${res?.name}<br>${res?.summary}`);
    }

    function rollDamage() {
        let dice = StringUtils.parseDiceNotation(data.damage);

        let attName = data.modifier.toLocaleLowerCase().split("/");
        let att = EAttributeUtils.stringToAttribute(attName[0]);
        let mod = (CharacterUtils.getAttribute(att) as IAttribute).value;

        let bonus = checkForTalent("Tiro fatal")
            ? [mod === 1 ? mod : Math.floor(mod / 2)]
            : [];

        const res = rollDice(
            data.name + " | Dano",
            dice.sides,
            bonus,
            dice.rollTimes,
        );
        
        toast.push(`${res?.name}<br>${res?.summary}`);
    }

    function checkForTalent(talent: "Campeão de tiro" | "Tiro fatal") {
        return $CharacterSheet.talents.find((t) => t.name == talent);
    }
</script>

<div class={`w-[45rem] flex flex-col ${bg} p-2 m-1 polygonL`}>
    <Accordion
        closeOnInteract={false}
        iconClass="w-10 h-9 object-scale-down"
        icon={data.icon}
        label={data.name}
    >
        <div class="flex flex-col items-start">
            <div class="grid grid-flow-col gap-x-4 text-sm">
                <p>
                    Dano: {data.damage}
                    <span class="uppercase">
                        {checkForTalent("Tiro fatal")
                            ? ` + ${data.modifier}/2`
                            : ""}</span
                    >
                </p>
                <p>
                    Acerto: {data.hit}
                    <span class="uppercase"
                        >+ {data.modifier +
                            (checkForTalent("Campeão de tiro")
                                ? ""
                                : "/2")}</span
                    >
                </p>
                <p>Critico: {data.critMult}</p>
                <p>Alcance: {data.range}m</p>
            </div>
            {#if showDices}
                <div class="mt-2 flex justify-between">
                    <button on:click={rollHit} class="btn-primary"
                        >Rolar Acerto</button
                    >
                    <button on:click={rollDamage} class="btn-primary mx-4"
                        >Rolar dano</button
                    >
                    <button
                        on:click={() => {
                            rollHit();
                            rollDamage();
                        }}
                        class="btn-primary">Rolar Acerto + Rolar dano</button
                    >
                </div>
            {/if}
            <div class="mt-2">
                <slot />
            </div>
        </div>
    </Accordion>
</div>
