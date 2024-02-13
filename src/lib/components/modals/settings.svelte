<script lang="ts">
    import { highlightJSON } from "$lib/highlight";
    import { CharacterSheet } from "$lib/store/character";
    import { playerSettings } from "$lib/store/settings";

    export let mouseInside: boolean = false;

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($CharacterSheet));

    const jsonString = {
        attributes: JSON.stringify($CharacterSheet.attributes, null, 2),
        inventory: JSON.stringify($CharacterSheet.inventory, null, 2),
        skill: JSON.stringify($CharacterSheet.skills, null, 2),
        character: JSON.stringify($CharacterSheet, null, 2),
    };
    const highlightedJSON = {
        attributes: highlightJSON(jsonString.attributes),
        inventory: highlightJSON(jsonString.inventory),
        skills: highlightJSON(jsonString.skill),
        character: highlightJSON(jsonString.character),
    };

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-[45rem]"
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
>
    <div class="btn-success p-2 mb-2">
        <a href={dataStr} download="char.json">Baixar Personagem</a>
    </div>
    <details class="my-2">
        <summary>Atributos</summary>
        <pre class="text-white">
                <code>

                {@html highlightedJSON.attributes}
                </code>
        </pre>
    </details>
    <details class="my-2">
        <summary>Inventario</summary>
        <pre class="text-white">
            <code>
                {@html highlightedJSON.inventory}
            </code>
        </pre>
    </details>
    <details class="my-2">
        <summary>Habilidades</summary>
        <pre class="text-white">
            <code>
                {@html highlightedJSON.skills}
            </code>
        </pre>
    </details>
    <details class="my-2">
        <summary>Personagem</summary>
        <pre class="text-white">
                <code>
                    {@html highlightedJSON.character}
                </code>
        </pre>
    </details>
</div>

<style>
    pre {
        background-color: #202020;
        padding: 20px;
        border-radius: 5px;
        font-family: "Courier New", Courier, monospace;
        overflow-x: auto; /* Ensures content is scrollable if it overflows */
    }
</style>
