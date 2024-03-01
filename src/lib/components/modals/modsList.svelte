<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { onWModsUpdate } from "$lib/store/events";

    export let index = 0;
    export let weapon: IWeapon;
    export let data: {
        muzzles: IItem[];
        optics: IItem[];
        underbarrel: IItem[];
    };

    let unique = {};
    const restart = () => (unique = {});

    function addModToWeapon(mod: IItem) {
        if (weapon.mods == undefined) weapon.mods = [];

        weapon.mods.push(mod);

        if (mod.attToModify !== undefined)
            weapon.bonus[mod.name] = { ...mod.attToModify };

        onWModsUpdate.trigger();
        restart();
    }

    function removeModeOfWeapon(mod: IItem) {
        if (weapon.mods == undefined) weapon.mods = [];

        const index = weapon.mods.indexOf(mod);
        weapon.mods.splice(index, 1);
        if (mod.attToModify !== undefined) delete weapon.bonus[mod.name];

        onWModsUpdate.trigger();
        restart();
    }

    function checkIsEquipped(mod: IItem) {
        if (!weapon.mods) return;

        if (weapon.mods.includes(mod)) return true;

        return false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]">
    <TabGroup
        selectedTab={index}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Pontas">
            {#each data.muzzles as mod}
                <div>
                    {#key unique}
                        <ItemPanel
                            iconClass="w-9 h-9 object-scale-down"
                            data={mod}
                            bind:condition={mod.isEquipped}
                            on:EquipItem={() => addModToWeapon(mod)}
                            on:UnEquipItem={() => removeModeOfWeapon(mod)}
                        />
                    {/key}
                </div>
            {/each}
        </Tab>
        <Tab id={1} title="Miras">
            {#each data.optics as mod}
                <div>
                    {#key unique}
                        <ItemPanel
                            iconClass="w-9 h-9 object-scale-down"
                            data={mod}
                            on:EquipItem={() => addModToWeapon(mod)}
                            on:UnEquipItem={() => removeModeOfWeapon(mod)}
                        />
                    {/key}
                </div>
            {/each}
        </Tab>
        <Tab id={2} title="Empunhadoras">
            {#each data.underbarrel as mod}
                <div>
                    {#key unique}
                        <ItemPanel
                            iconClass="w-9 h-9 object-scale-down"
                            data={mod}
                            on:EquipItem={() => addModToWeapon(mod)}
                            on:UnEquipItem={() => removeModeOfWeapon(mod)}
                        />
                    {/key}
                </div>
            {/each}
        </Tab>
    </TabGroup>
</div>
