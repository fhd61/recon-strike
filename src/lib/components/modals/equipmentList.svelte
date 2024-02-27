<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils, StringUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import WeaponPanel from "../characterSheet/weaponPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";

    export let data: { armor: IItem[]; fireArms: IWeapon[]; melee: IWeapon[] };
    export let index = 0;

    let reRender = false;
    let validHitDice = true
    let validDamageDice: boolean;
    const regex = /^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i;
    const itemAttToMod: Array<{ id: string; value: number }> = [];
    const tempItem: IItem = {
        name: "",
        description: "",
        isEquipped: false,
    };
    const tempWeapon: IWeapon = {
        name: "",
        description: "",
        hit: "1d20",
        damage: "1d8",
        modifier: "agi",
        damageType: undefined,
        range: 10,
        critValue: 20,
        critMut: 1.3,
        bonus: {}
    };

    function addModToItem() {
        reRender = true;

        itemAttToMod.push({ id: "agi", value: 1 });

        console.log(itemAttToMod);
        setTimeout(() => (reRender = false), 100);
    }

    function removeModOfItem(index: number) {
        reRender = true;

        itemAttToMod.splice(index, 1);

        console.log(itemAttToMod);
        setTimeout(() => (reRender = false), 100);
    }

    function createItem() {
        let newItem = { ...tempItem };
        let mods: { [id: string]: number } = {};

        itemAttToMod.map((mod) => {
            mods[mod.id] = mods.value;
        });
        newItem.attToModify = mods;

        $CharacterSheet.inventory.equipments.push({ ...newItem });
        console.log($CharacterSheet.inventory.equipments);
    }

    function createWeapon() {
        $CharacterSheet.inventory.weapons.push({ ...tempWeapon });
        console.log($CharacterSheet.inventory.weapons);
    }

    $: validHitDice = regex.test(tempWeapon.hit);
    $: validDamageDice = regex.test(tempWeapon.damage);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
    <TabGroup
        selectedTab={index}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Colete">
            {#each data.armor as item}
                <div>
                    <ItemPanel
                        iconClass="w-9 h-19 object-scale-down"
                        data={item}
                        bind:condition={item.isEquipped}
                        on:EquipItem={() =>
                            CharacterUtils.addItemToInventory(item)}
                        on:UnEquipItem={() =>
                            CharacterUtils.removeItemToInventory(item)}
                    ></ItemPanel>
                </div>
            {/each}
        </Tab>
        <Tab id={1} title="Armas">
            <TabGroup
                selectedTab={0}
                class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
            >
                <Tab id={0} title="Armas de Fogo">
                    {#each data.fireArms as item}
                        <WeaponPanel showDices={false} data={item}>
                            <button
                                class="btn-success ml-1 mb-2"
                                on:click={() =>
                                    CharacterUtils.addItemToInventory(item)}
                                >Adicionar</button
                            >
                        </WeaponPanel>
                    {/each}
                </Tab>
                <Tab id={1} title="Armas corpo a corpo">
                    {#each data.melee as item}
                        <WeaponPanel showDices={false} data={item}>
                            <button
                                class="btn-success ml-1 mb-2"
                                on:click={() =>
                                    CharacterUtils.addItemToInventory(item)}
                                >Adicionar</button
                            >
                        </WeaponPanel>
                    {/each}
                </Tab>
            </TabGroup>
        </Tab>
        <Tab id={2} title="Criar Item">
            <div>
                <label class="flex flex-col">
                    Nome
                    <input
                        bind:value={tempItem.name}
                        type="text"
                        class="input-darker p-2"
                    />
                </label>
                <label class="flex flex-col my-2">
                    Descrição
                    <textarea
                        bind:value={tempItem.description}
                        class="input-darker h-28 p-2"
                    />
                </label>
                <button class="btn-success" on:click={addModToItem}
                    >Adicionar Modificador</button
                >
                <div class="flex justify-start flex-wrap max-w-[45rem]">
                    {#key reRender}
                        {#each itemAttToMod as { id, value }, i}
                            <div class="mx-2 my-2 p-2 bg-zinc-950/30 polygonL">
                                <p>valor</p>
                                <div>
                                    <input
                                        bind:value
                                        type="number"
                                        class="input-darker p-2 w-16"
                                    />
                                    <select
                                        bind:value={id}
                                        class="p-1 w-16 h-10 uppercase bg-zinc-950/50"
                                    >
                                        <option value="agi">AGI</option>
                                        <option value="int">INT</option>
                                        <option value="for">FOR</option>
                                        <option value="vig">VIG</option>
                                        <option value="def">Defesa</option>
                                        <option value="ga">GA</option>
                                        <option value="speed"
                                            >Deslocamento</option
                                        >
                                        <option value="hp">Vida</option>
                                    </select>
                                    <button
                                        on:click={() => removeModOfItem(i)}
                                        class="btn-error">X</button
                                    >
                                </div>
                            </div>
                        {/each}
                    {/key}
                </div>
            </div>
            <div class="flex justify-end my-1">
                <button on:click={createItem} class="btn-success"
                    >Criar Item</button
                >
            </div></Tab
        >
        <Tab id={3} title="Criar Arma">
            <div>
                <div class="flex flex-col">
                    <label class="flex flex-col">
                        Nome
                        <input
                            class="input-darker p-2"
                            type="text"
                            bind:value={tempWeapon.name}
                        />
                    </label>
                    <label class="flex flex-col mt-4">
                        Descrição
                        <textarea
                            class="input-darker p-2 h-44"
                            bind:value={tempWeapon.description}
                        />
                    </label>
                </div>
                <div class="flex my-4">
                    <label class="flex flex-col w-44">
                        Dado de Acerto {@html validHitDice
                            ? ""
                            : "<strong class='text-red-500 absolute -translate-y-4'>Dado invalido</strong>"}
                        <input
                            bind:value={tempWeapon.hit}
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
                            bind:value={tempWeapon.damage}
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
                            bind:value={tempWeapon.modifier}
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
                            bind:value={tempWeapon.damageType}
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
                                bind:value={tempWeapon.critValue}
                                type="number"
                                class="input-darker p-2"
                            />
                        </label>
                        <label class="flex flex-col w-20 mx-20">
                            Multiplicador
                            <input
                                bind:value={tempWeapon.critMut}
                                type="number"
                                class="input-darker p-2"
                            />
                        </label>
                        <label class="flex flex-col w-20">
                            Alcance
                            <input
                                bind:value={tempWeapon.range}
                                type="number"
                                class="input-darker p-2"
                            />
                        </label>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button
                        disabled={!validHitDice || !validDamageDice}
                        on:click={createWeapon}
                        class="btn-success disabled:bg-green-900 disabled:opacity-30 transition-all"
                        >Criar Arma</button
                    >
                </div>
            </div>
        </Tab>
    </TabGroup>
</div>
