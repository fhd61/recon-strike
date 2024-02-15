<script lang="ts">
    import ItemPanel from "$lib/components/characterSheet/itemPanel.svelte";
    import type { IItem } from "$lib/types/interface/IItem";
    import { CharacterUtils, EAttributeUtils } from "$lib/utils";

    export let item: IItem;

    function equipItem() {
        for (const key in item.attToModify) {
            const value = item.attToModify[key];
            const att = EAttributeUtils.stringToAttribute(key);

            console.log({key, value, att})
            CharacterUtils.addBonusToAttribute(att, item.name, value);
        }

        item.isEquipped = true;
    }

    function unEquipItem() {
        for (const key in item.attToModify) {
            const att = EAttributeUtils.stringToAttribute(key);

            console.log({key, att})
            CharacterUtils.removeBonusOfAttribute(att, item.name);
        }
        item.isEquipped = false;
    }
</script>

<ItemPanel
    bind:data={item}
    bg="bg-zinc-900"
    iconClass="w-10 h-10 object-scale-down mr-2 -translate-y-1"
>
    <button
        class="bg-red-700 hover:bg-red-600 active:bg-red-700 mt-2 p-1 polygonL transition-all"
        on:click={() => {
            for (const key in item.attToModify) {
                const att = EAttributeUtils.stringToAttribute(key);

                CharacterUtils.removeBonusOfAttribute(att, item.name);
            }

            CharacterUtils.removeItemToInventory(item);
        }}>Remover</button
    >
    <button
        class={` ${
            item.isEquipped ? "bg-red-700" : "bg-green-700"
        }  mt-2 p-1 polygonL transition-all`}
        on:click={() => {
            item.isEquipped = !item.isEquipped;

            if (item.isEquipped) 
                unEquipItem();
            else 
                equipItem();
        }}>{!item.isEquipped ? "Equipar" : "Desequipar"}</button
    >
</ItemPanel>
