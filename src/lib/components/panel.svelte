<script lang="ts">
    export let title: string;
    export let fitAll: boolean = false;
</script>

<div class={`bg-black mb-2 ${fitAll ? "h-full" : ""} polygonL`}>
    <h2 class="capitalize bg-[#f86b10]/80 px-2 mb-2 font-semibold">{title}</h2>
    <div class="px-2 pb-2">
        <slot name="content" />
    </div>
</div>
