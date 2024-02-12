<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import ItemPanel from "../characterSheet/itemPanel.svelte";
    import { CharacterSheet } from "$lib/store/character";
    import TabGroup from "../tabs/tabGroup.svelte";
    import Tab from "../tabs/tab.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";
    import { Check } from "lucide-svelte";

    export let mouseInside: boolean = false;
    export let index = 0;
    export let weapon: IWeapon;
    export let data: {
        muzzles: IItem[];
        optics: IItem[];
        underbarrel: IItem[];
    };

    let reRender = false;

    function addModToWeapon(mod: IItem) {
        if (weapon.mods == undefined) weapon.mods = [];

        reRender = true;

        weapon.mods.push(mod);
        
        setTimeout(() => (reRender = false), 100);
    }

    function removeModeOfWeapon(index: number){
        if (weapon.mods == undefined) weapon.mods = [];
    
        reRender = true;

        weapon.mods.splice(index, 1)

        setTimeout(() => (reRender = false), 100);
    }

    function checkIsEquipped(mod: IItem) {
        return weapon.mods?.includes(mod);
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
            {#each data.muzzles as item, i}
                <div>
                    <ItemPanel
                        iconClass="w-9 h-9 object-scale-down"
                        data={item}
                    >
                        {#key reRender}
                            <button
                                on:click={() => {
                                    if(checkIsEquipped(item))
                                        removeModeOfWeapon(i)
                                    else
                                        addModToWeapon(item)

                                    console.log(weapon)
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
        </Tab>
        <Tab id={1} title="optics">
            {#each data.optics as item, i}
                <div>
                    <ItemPanel
                        iconClass="w-9 h-9 object-scale-down"
                        data={item}
                    >
                        {#key reRender}
                            <button
                                on:click={() => {
                                    if(checkIsEquipped(item))
                                        removeModeOfWeapon(i)
                                    else
                                        addModToWeapon(item)

                                    console.log(weapon)
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
        </Tab>
        <Tab id={2} title="Suportes">
            {#each data.underbarrel as item, i}
                <div>
                    <ItemPanel
                        iconClass="w-9 h-9 object-scale-down"
                        data={item}
                    >
                        {#key reRender}
                            <button
                                on:click={() => {
                                    if(checkIsEquipped(item))
                                        removeModeOfWeapon(i)
                                    else
                                        addModToWeapon(item)

                                    console.log(weapon)
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
        </Tab>
    </TabGroup>
</div>
