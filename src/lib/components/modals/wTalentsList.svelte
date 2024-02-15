<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";

    export let mouseInside: boolean = false;
    export let weapon: IWeapon;
    export let data: IItem[];

    let reRender = false;

    function addTalentToWeapon(talent: IItem) {
        if (weapon.talents == undefined) weapon.talents = [];

        reRender = true;

        weapon.talents.push(talent);
        
        if (talent.attToModify !== undefined)
            weapon.bonus[talent.name] = { ...talent.attToModify };

        setTimeout(() => (reRender = false), 100);
    }

    function removeTalentOfWeapon(talent: IItem, index:number) {
        if (weapon.talents == undefined) weapon.talents = [];

        reRender = true;

        weapon.talents.splice(index, 1);
        if (talent.attToModify !== undefined)
            delete weapon.bonus[talent.name];

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
                            if (checkIsEquipped(item)) removeTalentOfWeapon(i);
                            else addTalentToWeapon(item);

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
