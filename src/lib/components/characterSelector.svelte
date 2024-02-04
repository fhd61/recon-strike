<script lang="ts">
    import { goto } from "$app/navigation";
    import type { ICharacter } from "$lib/store/character";

    export let data:ICharacter
    export let index: number

    function LoadChar(){
        localStorage.setItem("character", JSON.stringify(data))
        localStorage.setItem("index", index.toString())
        goto("/characterSheet")
    }
</script>

<button
    on:click={LoadChar}
    class="h-fit w-[32rem] bg-zinc-900 m-2 p-2 polygonL hover:scale-105 active:hover:scale-110 transition-all"
>
    <div class="flex text-white">
        <img
            class="w-48 mr-4 polygonL"
            src={data.dossier.portrait}
            alt=""
        />
        <div class="text-left mt-4">
            <p class="text-lg">Nome: {data.dossier.name}</p>
            <p class="text-sm opacity-50 font-thin">Codenome: {data.dossier.callSign}</p>
            <p class="text-sm opacity-50 font-thin">Nivel: {data.dossier.level}</p>
        </div>
    </div>
</button>
