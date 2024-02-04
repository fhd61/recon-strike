<script lang="ts">
    import type { IItem } from "$lib/types/interface/IItem";
    import Accordion from "./accordion.svelte";
    import { marked } from "marked";

    export let data: IItem;
    export let bg = "bg-zinc-950";
    export let iconClass = ""

    $: htmlDescription = marked(data.description);
</script>

<div class={`w-[45rem] flex flex-col ${bg} p-1 m-1 polygonL`}>
    <Accordion closeOnInteract={false} {iconClass} icon={data.icon} label={data.name}>
        <div class="flex flex-col items-start">
            {@html htmlDescription}
            <div class="mt-2">
                <slot/>
            </div>
        </div>
    </Accordion>
</div>
