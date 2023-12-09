<script lang="ts">
    import type { IAttribute } from "$lib/interface/IBaseAttribute";

    export let data: IAttribute;
    export let inFront: boolean = false;
</script>

<div class="relative flex">
    <span class="bg-black w-12 text-center absolute translate-y-3 text-sm">{data.value}</span>
    <div class={`m-auto z-[${inFront? "1": "0"}]`}>
        <slot name="icon" />
    </div>
</div>
