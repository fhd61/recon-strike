<script lang="ts">
    import Accordion from "./accordion.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils, EAttributeUtils, StringUtils } from "$lib/utils";
    import { CharacterSheet } from "$lib/store/character";
    import { rollDice, rollForAttackAndDamage } from "$lib/diceRoller";
    import type { IAttribute } from "$lib/types/interface/IBaseAttribute";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";

    export let data: IWeapon;
    export let showDices: boolean = true;
    export let bg = "bg-zinc-950";

    function rollHit() {
        let dice = StringUtils.parseDiceNotation(data.hit);
        let attModifier = getAttributeModifier();

        if (!checkForTalent("Campeão de tiro"))
            attModifier = Math.ceil(attModifier / 2);

        const res = rollDice(
            data.name + " | Acerto",
            dice.sides,
            [attModifier],
            dice.rollTimes,
        );

        toast.push(`${res?.name}<br>${res?.summary}`);
    }

    function rollDamage() {
        let dice = StringUtils.parseDiceNotation(data.damage);
        let attModifier = getAttributeModifier();
        let bonus: number[] = [];

        if (checkForTalent("Tiro fatal"))
            bonus.push(Math.ceil(attModifier / 2));

        const res = rollDice(
            data.name + " | Dano",
            dice.sides,
            bonus,
            dice.rollTimes,
        );

        toast.push(`${res?.name}<br>${res?.summary}`);
    }

    function getAttributeModifier() {
        let attName = data.modifier.toLocaleLowerCase().split("/");
        let att = EAttributeUtils.stringToAttribute(attName[0]);
        let mod = (CharacterUtils.getAttribute(att) as IAttribute).value;

        return mod;
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
                <p>Critico: {data.critMut}</p>
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
            <div class="flex cursor-default">
                {#if data.mods !== undefined}
                    {#each data.mods as mod}
                        {#if mod.icon}
                            <div title={mod.description} class="mx-4 my-2 group">
                                <div class="">
                                    <img
                                        src={mod.icon}
                                        alt=""
                                        class="w-10 h-9 object-scale-down"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="absolute text-sm opacity-0 -translate-x-4 -translate-y-1 group-hover:opacity-100 transition-all"
                                    >
                                        {mod.name}
                                    </p>
                                </div>
                            </div>
                        {/if}
                    {/each}
                {/if}
            </div>
            <div class="mt-2">
                <slot />
            </div>
        </div>
    </Accordion>
</div>
