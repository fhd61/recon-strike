<script lang="ts">
    import type { IItem } from "$lib/interface/IItem";
    import { marked } from "marked";
    import Accordion from "./accordion.svelte";


    export let data: IItem;
    export let bg = "bg-zinc-950";

    $: htmlDescription = marked(data.description);
</script>

<div class={`w-[45rem] flex flex-col items-center ${bg} px-2 m-1 polygonL`}>
    <Accordion icon={data.icon} label={data.name}>
        <div class="flex flex-col">
            {@html htmlDescription}
            <slot/>
        </div>
    </Accordion>
</div>
