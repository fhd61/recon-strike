<script lang="ts">
    import WeaponPanel from "$lib/components/characterSheet/weaponPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { CharacterUtils } from "$lib/utils";

    export let item: IWeapon;
</script>

<WeaponPanel bind:data={item} bg="bg-zinc-900">
    <button
        class="bg-red-700 hover:bg-red-600 active:bg-red-700 mt-2 p-1 polygonL transition-all"
        on:click={() => {
            CharacterUtils.removeItemToInventory(item);
        }}>Remover</button
    >
    <button
        class={` ${
            item.isEquipped ? "bg-red-700" : "bg-green-700"
        }  mt-2 p-1 polygonL transition-all`}
        on:click={() => {
            item.isEquipped = !item.isEquipped;
        }}>{!item.isEquipped ? "Equipar" : "Desequipar"}</button
    >
</WeaponPanel>
