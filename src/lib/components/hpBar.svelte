<script lang="ts">
    import { clamp } from "$lib/utils";
    import type { IHp } from "../interface/IHp";
    import Icon from "@iconify/svelte";
    import { taphold } from "$lib/actions/taphold";
    import { tweened } from "svelte/motion";
    import { onMount } from "svelte";

    export let data: IHp;
    let larpValue = tweened(1);

    let hpInputField: HTMLInputElement;

    function Incresse() {
        data.currentValue = clamp(data.currentValue + 1, 0, data.maxValue);
    }

    function Decrease() {
        data.currentValue = clamp(data.currentValue - 1, 0, data.maxValue);
    }

    function Calc() {
        const regexPattern = /^(\d+)\s*([+\-*/])\s*(\d+)$/;
        const match = hpInputField.value.match(regexPattern);

        if (!match) return;

        const [, num1Str, operator, num2Str] = match;
        const num1 = parseInt(num1Str, 10);
        const num2 = parseInt(num2Str, 10);

        if (isNaN(num1) || isNaN(num2) || (operator === "/" && num2 === 0))
            return;

        const operators: { [key: string]: (a: number, b: number) => number } = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => (b !== 0 ? a / b : 0),
        };

        const result = operators[operator](num1, num2);

        data.currentValue = Math.floor(clamp(result, 0, data.maxValue));
    }

    function DeSelectInput(event: KeyboardEvent) {
        if (event.key !== "Enter") return;

        hpInputField.blur();
        larpValue.set((data.currentValue / data.maxValue) * 100);
    }

    onMount(() => larpValue.set((data.currentValue / data.maxValue) * 100));
</script>

<div class="h-8 w-full bg-red-800/60 relative polygonR">
    <div class="w-full absolute z-[1]">
        <div class="flex justify-evenly mx-2">
            <button
                class="hover:bg-zinc-800 p-1 translate-y-1 polygonR active:bg-zinc-600 transition-all"
                use:taphold
                on:taphold={() => {
                    Decrease()
                    larpValue.set((data.currentValue / data.maxValue) * 100);
                }}
            >
                <Icon icon="bxs:up-arrow" rotate={3} />
            </button>
            <div
                class="flex items-center justify-center translate-y-1 w-24 h-5"
            >
                <input
                    bind:this={hpInputField}
                    bind:value={data.currentValue}
                    on:focusout={Calc}
                    on:keydown={DeSelectInput}
                    type="text"
                    min={0}
                    class="bg-transparent w-8 m-auto text-right outline-none"
                />
                <p class="m-auto ml-1">| {data.maxValue}</p>
            </div>
            <button
                class="hover:bg-zinc-800 p-1 translate-y-1 polygonL active:bg-zinc-600 transition-all"
                use:taphold
                on:taphold={() => {
                    Incresse();
                    larpValue.set((data.currentValue / data.maxValue) * 100);
                }}
            >
                <Icon icon="bxs:up-arrow" rotate={1} />
            </button>
        </div>
    </div>
    <div class="h-8 bg-red-600 flex polygonR" style={`width:${$larpValue}%`} />
</div>
