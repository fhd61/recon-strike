<script lang="ts">
    import type { IDossier } from "$lib/interface/IDossier";

    export let data: IDossier;
    export let mouseInside:Boolean = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-[60rem] h-[45rem] flex justify-evenly" 
    on:mouseenter={() => mouseInside = true} 
    on:mouseleave={() => mouseInside = false}>
    <div class="flex flex-col">
        <img
            src="https://images.unsplash.com/photo-1701666469271-fd6c65a1e7d5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            class="w-80 h-72"
            alt=""
        />
    </div>
    <form class="flex flex-col mx-4">
        <div class="flex justify-between mx">
            <div class="flex flex-col">
                <label for="name">Name</label>
                <input
                    bind:value={data.name}
                    class="bg-zinc-800 px-2 py-1"
                    placeholder="Character Name"
                    id="name"
                    name="name"
                    type="text"
                />
            </div>
            <div class="flex flex-col mx-4">
                <label for="callSing">Call Sing</label>
                <input
                    bind:value={data.callSign}
                    id="callSing"
                    class="bg-zinc-800 px-2 py-1"
                    placeholder="CS123"
                    name="callSing"
                    type="text"
                />
            </div>
            <div class="flex flex-col">
                <label for="level">Level</label>
                <select
                    bind:value={data.level}
                    id="level"
                    class="bg-zinc-800 w-16 h-8 px-2 py-1"
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
                bind:value={data.bio}
                id="bio"
                class="bg-zinc-800 resize-none px-2 py-1"
                placeholder="Character biography..."
                name="notes"
                cols="30"
                rows="10"
            ></textarea>
        </div>
        <div class="flex flex-col col-span-3">
            <label for="notes">Notes</label>
            <textarea
                bind:value={data.notes}
                class="bg-zinc-800 resize-none px-2 py-1"
                id="notes"
                placeholder="Additional notes..."
                name="notes"
                cols="30"
                rows="10"
            ></textarea>
        </div>
    </form>
</div>