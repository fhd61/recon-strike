<script lang="ts">
    import Accordion from "./accordion.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils, StringUtils, WeaponsUtils } from "$lib/utils";
    import { CharacterSheet } from "$lib/store/character";
    import { rollDice } from "$lib/diceRoller";
    import { toast } from "@zerodevx/svelte-toast";
    import { onWModsUpdate, onWTalentsUpdate } from "$lib/store/events";

    export let data: IWeapon;
    export let showDices: boolean = true;
    export let bg = "bg-zinc-950";

    function rollHit(showPopup = true) {
        const dice = StringUtils.parseDiceNotation(data.hit);
        const att = WeaponsUtils.getAttributeModifier(data);
        const bonus: number[] = [WeaponsUtils.totalBonusOf("hit", data)];

        if (WeaponsUtils.checkForTalent("Campeão de tiro")) bonus.push(att);
        else bonus.push(Math.ceil(att / 2));

        const res = rollDice(
            data.name + " | Acerto",
            dice.sides,
            bonus,
            dice.rollTimes,
        );

        if (showPopup) toast.push(`${res?.name}<br>${res?.summary}`);

        return res;
    }

    function rollDamage(showPopup = true) {
        const dice = StringUtils.parseDiceNotation(data.damage);
        const att = WeaponsUtils.getAttributeModifier(data);
        const bonus: number[] = [WeaponsUtils.totalBonusOf("damage", data)];

        if (WeaponsUtils.checkForTalent("Tiro fatal")) bonus.push(att / 2);

        const res = rollDice(
            data.name + " | Dano",
            dice.sides,
            bonus,
            dice.rollTimes,
        );

        if (showPopup) toast.push(`${res?.name}<br>${res?.summary}`);

        return res;
    }

    function rollBoth() {
        const hit = rollHit(false);
        const damage = rollDamage(false);

        let critMutBonus = WeaponsUtils.totalBonusOf("critMut", data);
        let critHitValue = WeaponsUtils.totalBonusOf("critHit", data);

        if (hit.rolls.includes(20 + critHitValue)) {
            damage.total *= data.critMut + critMutBonus;

            toast.push(`${hit?.name}<br>${hit?.summary}`);
            toast.push(
                `${damage?.name}<br><span class="text-md text-orange-500 font-extrabold">${damage?.summary}</span>`,
            );
        } else {
            toast.push(`${hit?.name}<br>${hit?.summary}`);
            toast.push(`${damage?.name}<br>${damage?.summary}`);
        }
    }

    let unique = {};
    const restart = () => (unique = {});

    onWTalentsUpdate.on(() => {
        restart();
    });
    onWModsUpdate.on(() => {
        restart();
    });
</script>

<div class={`w-[45rem] flex flex-col ${bg} p-2 m-1 polygonL`}>
    <Accordion
        closeOnInteract={false}
        iconClass="w-10 h-9 object-scale-down"
        icon={data.icon}
        label={data.name}
    >
        <div class="flex flex-col items-start">
            <div class="grid grid-flow-col gap-x-5 text-sm">
                <p>
                    Dano: {data.damage}
                    <span class="uppercase">
                        {WeaponsUtils.checkForTalent("Tiro fatal")
                            ? ` + ${data.modifier}/2`
                            : ""}</span
                    >
                </p>
                <p>
                    Acerto: {data.hit}
                    <span class="uppercase"
                        >+ {data.modifier +
                            (WeaponsUtils.checkForTalent("Campeão de tiro")
                                ? ""
                                : "/2")}</span
                    >
                </p>
                <p>Critico: {data.critMut}</p>
                <p>Alcance: {data.range}m</p>
                {#if data.damageType !== undefined}
                    <p>Tipo de dano: {data.damageType}m</p>
                {/if}
            </div>
            {#if showDices}
                <div class="mt-2 flex justify-between">
                    <button on:click={() => rollHit()} class="btn-primary"
                        >Rolar Acerto</button
                    >
                    <button
                        on:click={() => rollDamage()}
                        class="btn-primary mx-4">Rolar dano</button
                    >
                    <button on:click={rollBoth} class="btn-primary"
                        >Rolar Acerto + Rolar dano</button
                    >
                </div>
            {/if}
            {#key unique}
                <div class="flex cursor-default">
                    {#if data.mods !== undefined}
                        {#each data.mods as mod}
                            {#if mod.icon}
                                <div
                                    title={mod.description}
                                    class="mx-4 my-2 group flex flex-col items-center justify-center"
                                >
                                    <img
                                        src={mod.icon}
                                        alt=""
                                        class="w-10 h-9 object-scale-down"
                                    />
                                    <div>
                                        <p
                                            class="text-sm text-center group-hover:opacity-100 transition-all"
                                        >
                                            {mod.name}
                                        </p>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
                <div class="flex cursor-default divide-white">
                    {#if data.talents !== undefined}
                        {#each data.talents as talent}
                            {#if talent.icon}
                                <div
                                    title={talent.description}
                                    class="mx-4 my-2 group flex flex-col items-center justify-center"
                                >
                                    <img
                                        src={talent.icon}
                                        alt=""
                                        class="w-10 h-9 object-scale-down"
                                    />
                                    <div>
                                        <p
                                            class="text-sm text-center group-hover:opacity-100 transition-all"
                                        >
                                            {talent.name}
                                        </p>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    {/if}
                </div>
            {/key}
            <div class="mt-2">
                <slot />
            </div>
        </div>
    </Accordion>
</div>
