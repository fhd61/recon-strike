<script lang="ts">
    import { goto } from "$app/navigation";
    import CharacterSelector from "$lib/components/characterSelector.svelte";
    import CreateChar from "$lib/components/modals/createChar.svelte";
    import type { ICharacter } from "$lib/store/character.js";
    import { onMount } from "svelte";
    export let data;

    let { supabase } = data;
    $: ({ supabase } = data);

    let modalElement: HTMLDialogElement;
    let characters: ICharacter[] = [];
    let mouseInsideModal: boolean;

    onMount(() => {
        getRows();
    });

    async function getRows() {
        let res = await supabase.from("cloud_save").select();

        characters = JSON.parse(res.data[0].json);
    }
</script>

<div class="flex flex-col text-white">
    <div class="flex justify-end mt-2">
        <form action="/logout" method="post">
        <button class="btn-error">Logout</button>
        </form>
        <button
            class="btn-success mx-2"
            on:click={() => modalElement.showModal()}>Criar Personagem</button
        >
    </div>
    <div>
        {#each characters as char, index}
            <CharacterSelector {index} data={char} />
        {/each}
    </div>
</div>

<!-- Show Modals -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="bg-zinc-900 text-white p-4 backdrop:bg-zinc-950/90 open:transition-all polygonL"
    bind:this={modalElement}
    on:click={() => {
        if (mouseInsideModal) return;

        modalElement.close();
    }}
>
    <CreateChar
        on:createClicked={() => {
            goto("/characterSheet");
        }}
        bind:mouseInside={mouseInsideModal}
        dbClient={data}
    />
</dialog>
