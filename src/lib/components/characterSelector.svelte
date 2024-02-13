<script lang="ts">
    import { goto } from "$app/navigation";
    import type { ICharacter } from "$lib/store/character";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import { createEventDispatcher, getContext } from "svelte";

    export let data: ICharacter;
    export let index: number;


    const dispatcher = createEventDispatcher()
    const dbClient: SupabaseClient = getContext("dbClient");

    function LoadChar() {
        localStorage.setItem("character", JSON.stringify(data));
        localStorage.setItem("index", index.toString());

        goto("/characterSheet");
    }

    async function DeleteChar() {
        const { data: dbChar, error: err } = await dbClient
            .from("cloud_save")
            .select("json");

        if (err) {
            console.log(err);
            return;
        }

        const charArr = JSON.parse(dbChar[0].json) as ICharacter[];

        charArr.splice(index, 1)

        await dbClient
            .from("cloud_save")
            .upsert([{ json: [JSON.stringify(charArr)] }]);
        
        dispatcher("characterDeleted")
    }
</script>

<div
    class="h-fit w-[32rem] bg-zinc-900 m-2 p-2 polygonL hover:scale-105 active:hover:scale-110 transition-all mx-5"
>
    <button on:click={LoadChar} class="">
        <div class="flex text-white">
            <img
                class="w-48 mr-4 polygonL"
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

    <button on:click={DeleteChar} class="btn-error">Deletar</button>
</div>
