<script lang="ts">
    import Accordion from "./accordion.svelte";
    import type { IWeapon } from "$lib/types/interface/IWeapon";

    export let data: IWeapon;
    export let bg = "bg-zinc-950";
</script>

<div class={`w-[45rem] flex flex-col ${bg} px-2 m-1 polygonL`}>
    <Accordion closeOnInteract={false} iconClass="w-10 h-10 object-scale-down mr-2 -translate-y-1" icon={data.icon} label={data.name}>
        <div class="flex flex-col items-start">
            <div class="grid grid-flow-col gap-x-4 text-sm">
                <p>Dano: {data.damage}</p>
                <p>Acerto: {data.hit} + {data.modifier}</p>
                <p>Critico: {data.critMult}</p>
                <p>Alcance: {data.range}m</p>
            </div>
            <div class="mt-2">
                <slot/>
            </div>
        </div>
    </Accordion>
</div>