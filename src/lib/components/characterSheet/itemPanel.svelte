<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import { CharacterUtils, EAttributeUtils } from "$lib/utils";
    import Accordion from "./accordion.svelte";
    import { marked } from "marked";

    export let data: IItem;
    export let useBtn = true;
    export let bg = "bg-zinc-950";
    export let iconClass = "";

    $: htmlDescription = marked(data.description);

    export function equipItem() {
        for (const key in data.attToModify) {
            const value = data.attToModify[key];
            const att = EAttributeUtils.stringToAttribute(key);

            console.log({ key, value, att });
            CharacterUtils.addBonusToAttribute(att, data.name, value);
        }

        data.isEquipped = true;
    }

    export function unEquipItem() {
        for (const key in data.attToModify) {
            const att = EAttributeUtils.stringToAttribute(key);

            console.log({ key, att });
            CharacterUtils.removeBonusOfAttribute(att, data.name);
        }
        data.isEquipped = false;
    }
</script>

<div class={`w-[45rem] flex flex-col ${bg} p-1 m-1 polygonL`}>
    <Accordion
        closeOnInteract={false}
        {iconClass}
        icon={data.icon}
        label={data.name}
    >
        <div class="flex flex-col items-start">
            {@html htmlDescription}
            <div class="mt-2">
                {#if useBtn}
                    <button
                        on:click={() => {
                            if (data.isEquipped) unEquipItem();
                            else equipItem();
                        }}
                        class={`${
                            data.isEquipped ? "btn-error" : "btn-success"
                        } transition-all`}
                        >{data.isEquipped ? "Desequipar" : "Equipar"}</button
                    >
                {/if}
                <slot />
            </div>
        </div>
    </Accordion>
</div>
