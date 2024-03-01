<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import { CharacterUtils, EAttributeUtils } from "$lib/utils";
    import Accordion from "./accordion.svelte";
    import { marked } from "marked";
    import { createEventDispatcher } from "svelte";

    export let data: IItem;
    export let useBtn = true;
    export let bg = "bg-zinc-950";
    export let iconClass = "";
    export let condition = false;
    export let equipText = "Equipar";
    export let unEquipText = "Desequipar";

    let textToShow = equipItem;

    const dispatcher = createEventDispatcher();

    function equipItem() {
        dispatcher("EquipItem");
        data.isEquipped = true;
    }

    function unEquipItem() {
        dispatcher("UnEquipItem");
        data.isEquipped = false;
    }

    $: htmlDescription = marked(data.description);
    $: textToShow = condition ? unEquipItem : equipItem;
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
                        >{data.isEquipped ? unEquipText : equipText}</button
                    >
                {/if}
                <slot />
            </div>
        </div>
    </Accordion>
</div>
