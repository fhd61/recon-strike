<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { onWTalentsUpdate } from "$lib/store/events";
    export let mouseInside: boolean = false;
    export let weapon: IWeapon;
    export let data: IItem[];

    let unique = {};
    const restart = () => (unique = {});

    function addTalentToWeapon(talent: IItem) {
        if (weapon.talents == undefined) weapon.talents = [];

        weapon.talents.push(talent);

        if (talent.attToModify !== undefined)
            weapon.bonus[talent.name] = { ...talent.attToModify };

        onWTalentsUpdate.trigger();
        restart();
    }

    function removeTalentOfWeapon(talent: IItem) {
        if (weapon.talents == undefined) weapon.talents = [];

        const index = weapon.talents.indexOf(talent);
        weapon.talents.splice(index, 1);

        if (talent.attToModify !== undefined) delete weapon.bonus[talent.name];

        restart();
    }

    function checkIsEquipped(mod: IItem) {
        if (!weapon.talents) return false;

        return weapon.talents.includes(mod);
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
            {#key unique}
                <ItemPanel
                    iconClass="w-9 h-9 object-scale-down"
                    data={item}
                    bind:condition={item.isEquipped}
                    on:EquipItem={() => addTalentToWeapon(item)}
                    on:UnEquipItem={() => removeTalentOfWeapon(item)}
                ></ItemPanel>
            {/key}
        </div>
    {/each}
</div>
