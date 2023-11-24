<script lang="ts">
    import { clamp } from "$lib/utils";
    import type { IHp } from "../interface/IHp";
    import Icon from "@iconify/svelte";

    export let data: IHp;

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

        if (isNaN(num1) || isNaN(num2)) return;

        // Perform the calculation based on the operator
        switch (operator) {
            case "+":
                data.currentValue = Math.floor(
                    clamp(num1 + num2, 0, data.maxValue)
                );
                break;
            case "-":
                data.currentValue = Math.floor(
                    clamp(num1 - num2, 0, data.maxValue)
                );
                break;
            case "*":
                data.currentValue = Math.floor(
                    clamp(num1 * num2, 0, data.maxValue)
                );
                break;
            case "/":
                if (num2 === 0) break;

                data.currentValue = Math.floor(
                    clamp(num1 / num2, 0, data.maxValue)
                );
        }
    }

    function HandleKeyDown(event: KeyboardEvent) {
        if (event.key !== "Enter") return;

        hpInputField.blur();
    }
</script>

<div class="h-8 w-full bg-red-800/60 relative polygonR">
    <div class="w-full absolute z-[1]">
        <div class="flex justify-evenly mx-2">
            <button
                class="hover:bg-zinc-800 p-1 translate-y-1 polygonR active:bg-zinc-600 transition-all"
                on:click={Decrease}
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
                    on:keydown={HandleKeyDown}
                    type="text"
                    min="0"
                    class="bg-transparent w-8 m-auto text-right outline-none"
                />
                <p class="m-auto ml-1">| {data.maxValue}</p>
            </div>
            <button
                class="hover:bg-zinc-800 p-1 translate-y-1 polygonL active:bg-zinc-600 transition-all"
                on:click={Incresse}
            >
                <Icon icon="bxs:up-arrow" rotate={1} />
            </button>
        </div>
    </div>
    <div
        class="h-8 bg-red-600 flex polygonR"
        style={`width:${(data.currentValue / data.maxValue) * 100}%`}
    />
</div>
