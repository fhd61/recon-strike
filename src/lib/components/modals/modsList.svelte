<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { onWModsUpdate } from "$lib/store/events";

    export let mouseInside: boolean = false;
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

        onWModsUpdate.trigger()
        restart();
    }

    function removeModeOfWeapon(mod: IItem) {
        if (weapon.mods == undefined) weapon.mods = [];

        const index = weapon.mods.indexOf(mod);
        weapon.mods.splice(index, 1);
        if (mod.attToModify !== undefined) delete weapon.bonus[mod.name];

        onWModsUpdate.trigger()
        restart();
    }

    function checkIsEquipped(mod: IItem) {
        if (!weapon.mods) return;

        if (weapon.mods.includes(mod)) return true;

        return false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
    class="grid grid-flow-row flex-wrap justify-around items-center w-[50rem]"
>
    <TabGroup
        selectedTab={index}
        class="flex w-full mb-2 justify-around items-center bg-zinc-950 h-10 polygonR capitalize"
    >
        <Tab id={0} title="Pontas">
            {#each data.muzzles as mod, i}
                <div>
                    <ItemPanel iconClass="w-9 h-9 object-scale-down" data={mod} useBtn={false}>
                        {#key unique}
                            <button
                                on:click={() => {
                                    if (checkIsEquipped(mod))
                                        removeModeOfWeapon(mod);
                                    else addModToWeapon(mod);
                                }}
                                class={checkIsEquipped(mod)
                                    ? "btn-error"
                                    : "btn-success"}
                                >{checkIsEquipped(mod)
                                    ? "Desequipar"
                                    : "Equipar"}</button
                            >
                        {/key}
                    </ItemPanel>
                </div>
            {/each}
        </Tab>
        <Tab id={1} title="optics">
            {#each data.optics as mod, i}
                <div>
                    <ItemPanel iconClass="w-9 h-9 object-scale-down" data={mod} useBtn={false}>
                        {#key unique}
                            <button
                                on:click={() => {
                                    if (checkIsEquipped(mod))
                                        removeModeOfWeapon(mod);
                                    else addModToWeapon(mod);
                                }}
                                class={checkIsEquipped(mod)
                                    ? "btn-error"
                                    : "btn-success"}
                                >{checkIsEquipped(mod)
                                    ? "Desequipar"
                                    : "Equipar"}</button
                            >
                        {/key}
                    </ItemPanel>
                </div>
            {/each}
        </Tab>
        <Tab id={2} title="Suportes">
            {#each data.underbarrel as mod, i}
                <div>
                    <ItemPanel iconClass="w-9 h-9 object-scale-down" data={mod} useBtn={false}>
                        {#key unique}
                            <button
                                on:click={() => {
                                    if (checkIsEquipped(mod))
                                        removeModeOfWeapon(mod);
                                    else addModToWeapon(mod);
                                }}
                                class={checkIsEquipped(mod)
                                    ? "btn-error"
                                    : "btn-success"}
                                >{checkIsEquipped(mod)
                                    ? "Desequipar"
                                    : "Equipar"}</button
                            >
                        {/key}
                    </ItemPanel>
                </div>
            {/each}
        </Tab>
    </TabGroup>
</div>
