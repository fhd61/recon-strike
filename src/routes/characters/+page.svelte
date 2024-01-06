<script lang="ts">
    import { onMount } from "svelte";
    export let data;

    let { supabase } = data;
    $: ({ supabase } = data);

    onMount(() => {
        getRows();
    });

    async function getRows() {
        let request = await supabase.from("savedChars").select("*");

        console.log(request);
    }
</script>

<div class="h-screen flex justify-center items-center">
    <div class="h-96 grid grid-cols-2 gap-4">
        <button
            class="h-fit w-[32rem] bg-zinc-900 p-2 polygonL hover:scale-105 active:hover:scale-110 transition-all"
        >
            <div class="flex text-white">
                <img
                    class="w-48 mr-4 polygonL"
                    src="https://images.unsplash.com/photo-1682686578707-140b042e8f19?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
                <div class="text-left mt-4">
                    <p class="text-lg">Nome: Fabricio</p>
                    <p class="text-sm opacity-50 font-thin">Codenome: Cafe</p>
                </div>
            </div>
        </button>
    </div>
</div>
