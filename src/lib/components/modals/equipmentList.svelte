<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils } from "$lib/utils";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import WeaponPanel from "../characterSheet/weaponPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";

    export let data: { armor: IItem[]; fireArms: IWeapon[]; melee: IWeapon[] };
    export let mouseInside: boolean = false;
    export let index = 0;

    let reRender = false;
    let itemAttToMod: Array<{ id: string; value: number }> = [];
    let tempItem: IItem = {
        name: "",
        description: "",
        isEquipped: false,
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
        let newItem = {...tempItem}
        let mods: { [id: string]: number } = {}
        
        itemAttToMod.map((mod) => {
            mods[mod.id] = mods.value
        })
        newItem.attToModify = mods

        $CharacterSheet.inventory.equipments.push({...newItem})
        console.log($CharacterSheet.inventory.equipments)
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mouseenter={() => (mouseInside = true)}>
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
                    >
                        <button
                            class="btn-success ml-1 mb-2"
                            on:click={() =>
                                CharacterUtils.addItemToInventory(item)}
                            >Adicionar</button
                        >
                    </ItemPanel>
                </div>
            {/each}
        </Tab>
        <Tab id={1} title="Armas">
            {#each data.fireArms as item}
                <WeaponPanel showDices={false} data={item}>
                    <button
                        class="btn-success ml-1 mb-2"
                        on:click={() => CharacterUtils.addItemToInventory(item)}
                        >Adicionar</button
                    >
                </WeaponPanel>
            {/each}
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
                                        <option value="ca">GA</option>
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
                <button on:click={createItem} class="btn-success">Criar Item</button>
            </div></Tab
        >
        <Tab id={3} title="Criar Arma">
            <div></div>
        </Tab>
    </TabGroup>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
></div>
