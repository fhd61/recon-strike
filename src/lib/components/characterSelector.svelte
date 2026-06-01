<script lang="ts">
    import { goto } from "$app/navigation";
    import type { ICharacter } from "$lib/store/character";
    import { CharacterUtils } from "$lib/utils.js";
    import { createEventDispatcher } from "svelte";

    export let data: ICharacter;
    export let index: number;

    const dispatcher = createEventDispatcher();

    function LoadChar() {
        localStorage.setItem("character", JSON.stringify(data));
        localStorage.setItem("index", index.toString());

        goto("/characterSheet");
    }

    function DeleteChar() {
        CharacterUtils.deleteLocalCharacter(index);
        dispatcher("characterDeleted");
    }

    function DownloadChar() {
        CharacterUtils.exportCharToFile(data);
    }
</script>

<div
    class="h-fit w-[32rem] bg-zinc-900 m-2 p-2 polygonL hover:scale-105 active:hover:scale-110 transition-all mx-5"
>
    <button on:click={LoadChar} class="">
        <div class="flex text-white">
            <img
                class="w-48 mr-4 polygonL"
                width="192"
                height="192"
                src={data.dossier.portrait}
                alt=""
            />
            <div class="text-left mt-4">
                <p class="text-lg">Nome: {data.dossier.name}</p>
                <p class="text-sm opacity-50 font-thin">
                    Codenome: {data.dossier.callSign}
                </p>
                <p class="text-sm opacity-50 font-thin">
                    Nivel: {data.dossier.level}
                </p>
            </div>
        </div>
    </button>

    <div class="flex gap-2 mt-2">
        <button on:click={DeleteChar} class="btn-error">Deletar</button>
        <button on:click={DownloadChar} class="btn-success">Baixar</button>
    </div>
</div>
