<script lang="ts">
    import Icon from "@iconify/svelte";
    export let currentValue: number;
    export let maxValue: number;
</script>

<div class="h-8 w-full bg-red-800/60 relative polygonR">
    <div class="w-full absolute z-[1]">
        <div class="flex justify-evenly mx-2">
            <button class="hover:bg-zinc-800 p-1 translate-y-1 polygonR active:bg-zinc-600 transition-all">
                <Icon icon="bxs:up-arrow"rotate={3} />
            </button>
            <span class="translate-y-1"
                >{currentValue} | {maxValue}</span
            >
            <button class="hover:bg-zinc-800 p-1 translate-y-1 polygonL active:bg-zinc-600 transition-all">
                <Icon icon="bxs:up-arrow" rotate={1} />
            </button>
        </div>
    </div>
    <div
        class="h-8 bg-red-600 flex polygonR"
        style={`width:${(currentValue / maxValue) * 100}%`}
    />
</div>
