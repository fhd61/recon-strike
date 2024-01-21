<script lang="ts">
    import type { IDossier } from "$lib/types/interface/IDossier";
    import { v4 as uuidv4 } from "uuid";
    import type { Session, SupabaseClient } from "@supabase/supabase-js";
    import Icon from "@iconify/svelte";
    import callSingGenerator from "$lib/callSingGenerator";
    import nameGenerator from "$lib/nameGenerator";

    export let dossier: IDossier;
    export let mouseInside: Boolean = false;
    export let dbClient: {
        session: Session | null;
        supabase: SupabaseClient<any, "public", any>;
    };

    let inputFile: HTMLInputElement;
    let portraitUrl = dossier.portrait;
    let noImage =
        "https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/avatars/Placeholder/noImage.png";

    $: portraitUrl = dossier.portrait;

    async function uploadImgToStorage(file: File) {
        const fileName = uuidv4().toString() + file.type.split("/")[1];
        const { data } = await dbClient.supabase.auth.getUser();

        const path = data.user?.id + "/" + fileName;

        await dbClient.supabase.storage.from("avatars").upload(path, file);

        const url = await dbClient.supabase.storage
            .from("avatars")
            .getPublicUrl(path);

        dossier.portrait = url.data.publicUrl;

        return url;
    }

    function genName() {
        nameGenerator().then((res) => (dossier.name = res));
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-[60rem] h-[45rem] flex justify-evenly"
    on:mouseenter={() => (mouseInside = true)}
    on:mouseleave={() => (mouseInside = false)}
>
    <div class="flex flex-col">
        <img
            src={portraitUrl ? portraitUrl : noImage}
            class="w-80 h-72 polygon"
            alt=""
        />
        <div
            class="bg-zinc-700 hover:bg-orange-600 mt-2 p-1 text-center polygonR transition-all"
        >
            <label class="w-full cursor-pointer" for="files"
                >Selecionar foto</label
            >
            <input
                id="files"
                class="w-full hidden"
                type="file"
                accept="image/png, image/jpg, image/webp"
                bind:this={inputFile}
                on:change={(e) => {
                    uploadImgToStorage(inputFile.files[0]);
                }}
            />
        </div>
    </div>
    <div class="flex flex-col mx-4">
        <div class="flex justify-between mx">
            <div class="flex flex-col">
                <label for="name">
                    Name

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
            <div class="flex flex-col">
                <label for="level">Level</label>
                <select
                    bind:value={dossier.level}
                    id="level"
                    class="bg-zinc-800 w-16 h-8 px-2 py-1 polygonL"
                    name="level"
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
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
        <div class="flex flex-col col-span-3">
            <label for="notes">Notes</label>
            <textarea
                bind:value={dossier.notes}
                class="bg-zinc-800 resize-none px-2 py-1 polygonL"
                id="notes"
                placeholder="Additional notes..."
                name="notes"
                cols="30"
                rows="10"
            ></textarea>
        </div>
    </div>
</div>
