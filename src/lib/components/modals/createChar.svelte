<script lang="ts">
    import type { IDossier } from "$lib/types/interface/IDossier";
    import Icon from "@iconify/svelte";
    import callSingGenerator from "$lib/callSingGenerator";
    import nameGenerator from "$lib/nameGenerator";
    import type { ICharacter } from "$lib/store/character";
    import { CharacterUtils } from "$lib/utils.js";
    import { createEventDispatcher } from "svelte";

    let dossier: IDossier = {
        name: "",
        callSign: "",
        level: 0,
        portrait: "",
        bio: "",
        notes: "",
    };

    export const dispatcher = createEventDispatcher();

    let inputFile: HTMLInputElement;
    let portraitUrl = "";
    let noImage = "/placeholder-portrait.svg";

    $: portraitUrl = dossier.portrait;

    function uploadImgLocally(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            dossier.portrait = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }

    function create() {
        const newChar: ICharacter = {
            dossier: { ...dossier },
            attributes: {
                hp: { currentValue: 1, maxValue: 1, bonus: {} },
                agi: { id: "agi", name: "Agility", shortName: "agi", value: 1, bonus: {} },
                int: { id: "int", name: "Intelligence", shortName: "int", value: 1, bonus: {} },
                for: { id: "for", name: "Force", shortName: "for", value: 1, bonus: {} },
                vig: { id: "agi", name: "Vigor", shortName: "vig", value: 1, bonus: {} },
                def: { id: "def", name: "Defense", shortName: "def", value: 0, bonus: {} },
                speed: { id: "speed", name: "Speed", shortName: "speed", value: 9, bonus: {} },
                ga: { id: "ga", name: "ga", shortName: "ac", value: 0, bonus: {}, use: "agi" },
            },
            skills: [],
            inventory: { equipments: [], weapons: [] },
            talents: [],
        };

        const chars = CharacterUtils.getLocalCharacters();
        chars.push(newChar);
        CharacterUtils.saveLocalCharacters(chars);

        dispatcher("createClicked", { index: chars.length - 1 });
    }

    function genName() {
        nameGenerator().then((res) => (dossier.name = res));
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex justify-evenly">
    <div class="flex flex-col">
        <img
            src={portraitUrl ? portraitUrl : noImage}
            class="w-80 h-72 polygon object-scale-downF"
            alt=""
            on:error={(e) => (e.target.src = "/placeholder-portrait.svg")}
        />
        <button
            on:click={() => inputFile.click()}
            class="bg-zinc-700 hover:bg-orange-600 mt-2 p-1 text-center polygonR transition-all"
        >
            <label class=" cursor-pointer" for="files">Selecionar foto</label>
            <input
                id="files"
                class="w-full hidden"
                type="file"
                accept="image/png, image/jpg, image/webp"
                bind:this={inputFile}
                on:change={() => {
                    if (inputFile.files?.[0]) uploadImgLocally(inputFile.files[0]);
                }}
            />
        </button>
    </div>
    <div class="flex flex-col mx-4">
        <div class="flex justify-between mx">
            <div class="flex flex-col">
                <label for="name">
                    Nome
                    <button
                        class="hover:scale-110 transition-all"
                        on:click={genName}
                    >
                        <Icon icon="fa6-solid:dice" />
                    </button>
                </label>
                <input
                    bind:value={dossier.name}
                    class="bg-zinc-800 px-2 py-1 polygonL"
                    placeholder="Character Name"
                    id="name"
                    name="name"
                    type="text"
                />
            </div>
            <div class="flex flex-col mx-4">
                <label for="callSing">
                    Call Sing
                    <button
                        class="hover:scale-110 transition-all"
                        on:click={() => {
                            dossier.callSign = callSingGenerator();
                        }}
                    >
                        <Icon icon="fa6-solid:dice" />
                    </button>
                </label>
                <input
                    bind:value={dossier.callSign}
                    id="callSing"
                    class="bg-zinc-800 px-2 py-1 polygonL"
                    placeholder="CS123"
                    name="callSing"
                    type="text"
                />
            </div>
        </div>
        <div class="flex flex-col col-span-3 my-4">
            <label for="bio">Bio</label>
            <textarea
                bind:value={dossier.bio}
                id="bio"
                class="bg-zinc-800 resize-none px-2 py-1 polygonL"
                placeholder="Character biography..."
                name="notes"
                cols="30"
                rows="10"
            ></textarea>
        </div>
        <button
            on:click={create}
            class="bg-green-600 hover:bg-green-800 active:bg-green-500 p-2 transition-all polygonL mr-3"
            >Criar</button
        >
    </div>
</div>
