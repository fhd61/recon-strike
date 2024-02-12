<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";

    export let mouseInside: boolean = false;
    export let weapon: IWeapon;
    export let data: IItem[];

    let reRender = false;

    function addModToWeapon(mod: IItem) {
        if (weapon.talents == undefined) weapon.talents = [];

        reRender = true;

        weapon.talents.push(mod);

        setTimeout(() => (reRender = false), 100);
    }

    function removeModeOfWeapon(index: number) {
        if (weapon.talents == undefined) weapon.talents = [];

        reRender = true;

        weapon.talents.splice(index, 1);

        setTimeout(() => (reRender = false), 100);
    }

    function checkIsEquipped(mod: IItem) {
        return weapon.talents?.includes(mod);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    {#each data as item, i}
        <div>
            <ItemPanel iconClass="w-9 h-9 object-scale-down" data={item}>
                {#key reRender}
                    <button
                        on:click={() => {
                            if (checkIsEquipped(item)) removeModeOfWeapon(i);
                            else addModToWeapon(item);

                            console.log(weapon);
                        }}
                        class={checkIsEquipped(item)
                            ? "btn-error"
                            : "btn-success"}
                        >{checkIsEquipped(item)
                            ? "Desequipar"
                            : "Equipar"}</button
                    >
                {/key}
            </ItemPanel>
        </div>
    {/each}
</div>
