<script lang="ts">
    import { goto } from "$app/navigation";
    import CharacterSelector from "$lib/components/characterSelector.svelte";
    import Modal from "$lib/components/modal.svelte";
    import CreateChar from "$lib/components/modals/createChar.svelte";
    import type { ICharacter } from "$lib/store/character.js";
    import { onMount, setContext } from "svelte";
    export let data;

    let { supabase } = data;
    $: ({ supabase } = data);

    let characters: ICharacter[] = [];
    let reRender = false;
    let showModal = false;

    // onMount(() => {
    //     getRows();
    // });

    // async function getRows() {
    //     let res = await supabase
    //         .from("cloud_save")
    //         .select()
    //         .eq("user_id", data.session?.user.id);

    //     characters = JSON.parse(res.data[0].json) as ICharacter[];
    //     console.log(characters);

    //     for (let index = 0; index < characters.length; index++) {
    //         if (characters[index] === null || characters[index] === undefined)
    //             characters.splice(index, 1);
    //     }
    // }

    setContext("dbClient", data.supabase);
</script>

<div class="flex flex-col text-white">
    <div class="flex justify-end mt-2">
        <form action="/logout" method="post">
            <button class="btn-error">Logout</button>
        </form>
        <button class="btn-success mx-2" on:click={() => (showModal = true)}
            >Criar Personagem</button
        >
    </div>
    <div class="flex flex-wrap">
        <!-- {#each characters as char, index}
            <CharacterSelector
                on:characterDeleted={() => {
                    reRender = true;
                }}
                {index}
                data={char}
            />
        {/each} -->
    </div>
</div>

<Modal bind:showModal>
    <CreateChar
        arrLength={characters.length}
        on:createClicked={() => {
            goto("/characterSheet");
        }}
        dbClient={data}
    />
</Modal>
