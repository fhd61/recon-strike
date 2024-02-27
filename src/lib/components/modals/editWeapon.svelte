<script lang="ts">
    import type { IWeapon } from "$lib/types/interface/IWeapon";

    export let weapon:IWeapon

    let validHitDice = true
    let validDamageDice: boolean;
    const regex = /^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i;

    $: validHitDice = regex.test(weapon.hit);
    $: validDamageDice = regex.test(weapon.damage);
</script>

<div>
    <div class="flex flex-col">
        <label class="flex flex-col">
            Nome
            <input
                class="input-darker p-2"
                type="text"
                bind:value={weapon.name}
            />
        </label>
        <label class="flex flex-col mt-4">
            Descrição
            <textarea
                class="input-darker p-2 h-44"
                bind:value={weapon.description}
            />
        </label>
    </div>
    <div class="flex my-4">
        <label class="flex flex-col w-44">
            Dado de Acerto {@html validHitDice
                ? ""
                : "<strong class='text-red-500 absolute -translate-y-4'>Dado invalido</strong>"}
            <input
                bind:value={weapon.hit}
                class="input-darker p-2 placeholder:opacity-10"
                title="Tipo de dano invalido"
                pattern="/^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i"
                placeholder="1d20"
                type="text"
            />
        </label>
        <label class="flex flex-col w-44 ml-6">
            Dado de Dano {@html validDamageDice
                ? ""
                : "<strong class='text-red-500 absolute -translate-y-4'>Dado invalido</strong>"}
            <input
                bind:value={weapon.damage}
                class="input-darker p-2 placeholder:opacity-10"
                title="Tipo de dano invalido"
                pattern="/^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i"
                placeholder="1d8"
                type="text"
            />
        </label>
        <label class="ml-6">
            <p>Modificador de Acerto</p>
            <select
                bind:value={weapon.modifier}
                class="p-1 w-44 h-10 uppercase bg-zinc-950/50"
            >
                <option value="agi">AGI</option>
                <option value="int">INT</option>
                <option value="for">FOR</option>
                <option value="vig">VIG</option>
                <option value="def">Defesa</option>
                <option value="ga">GA</option>
                <option value="speed">Deslocamento</option>
                <option value="hp">Vida</option>
            </select>
        </label>
        <label class="ml-6">
            <p>Tipo de Dano</p>
            <select
                bind:value={weapon.damageType}
                class="p-1 w-44 h-10 uppercase bg-zinc-950/50"
            >
                <option value={undefined}>-</option>
                <option value="slashing">Corte</option>
                <option value="bludgeoning">Contusão</option>
            </select>
        </label>
    </div>
    <div>
        <div class="flex">
            <label class="flex flex-col w-20">
                Critico
                <input
                    bind:value={weapon.critValue}
                    type="number"
                    class="input-darker p-2"
                />
            </label>
            <label class="flex flex-col w-20 mx-20">
                Multiplicador
                <input
                    bind:value={weapon.critMut}
                    type="number"
                    class="input-darker p-2"
                />
            </label>
            <label class="flex flex-col w-20">
                Alcance
                <input
                    bind:value={weapon.range}
                    type="number"
                    class="input-darker p-2"
                />
            </label>
        </div>
    </div>
</div>
