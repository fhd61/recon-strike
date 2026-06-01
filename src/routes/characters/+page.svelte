<script lang="ts">
    import { goto } from "$app/navigation";
    import CharacterSelector from "$lib/components/characterSelector.svelte";
    import Modal from "$lib/components/modal.svelte";
    import CreateChar from "$lib/components/modals/createChar.svelte";
    import type { ICharacter } from "$lib/store/character.js";
    import { CharacterUtils } from "$lib/utils.js";
    import { onMount } from "svelte";

    let characters: ICharacter[] = [];
    let reRender = false;
    let showModal = false;
    let fileInput: HTMLInputElement;

    onMount(() => {
        getRows();
    });

    function getRows() {
        characters = CharacterUtils.getLocalCharacters();
    }

    async function importChar() {
        const file = fileInput.files?.[0];
        if (!file) return;

        try {
            const char = await CharacterUtils.importCharFromFile(file);
            characters.push(char);
            CharacterUtils.saveLocalCharacters(characters);
            reRender = !reRender;
        } catch (err) {
            console.error(err);
        }

        fileInput.value = "";
    }
</script>

<div class="flex flex-col text-white">
    <div class="flex justify-end mt-2">
        <button class="btn-success mx-2" on:click={() => fileInput.click()}
            >Importar Personagem</button
        >
        <input
            type="file"
            accept=".json"
            bind:this={fileInput}
            class="hidden"
            on:change={importChar}
        />
        <button class="btn-success mx-2" on:click={() => (showModal = true)}
            >Criar Personagem</button
        >
    </div>
    <div class="flex flex-wrap">
        {#each characters as char, index}
            <CharacterSelector
                on:characterDeleted={() => {
                    getRows();
                }}
                {index}
                data={char}
            />
        {/each}
        {#if characters.length === 0}
            <p class="text-center w-full mt-8 opacity-50"
                >Nenhum personagem encontrado. Crie ou importe um.</p
            >
        {/if}
    </div>
</div>

<Modal bind:showModal>
    <CreateChar
        arrLength={characters.length}
        on:createClicked={() => {
            goto("/characterSheet");
        }}
    />
</Modal>
