<script lang="ts">
    import Logo from "$lib/components/logo.svelte";
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { fade, slide } from "svelte/transition";

    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

    let animate = false;
</script>

<svelte:head>
    <title>SHD - Loading</title>
</svelte:head>

    <div
        class="flex justify-center items-center h-screen text-white"
        in:fade
        out:fade
    >
        <div class="flex flex-col justify-center items-center">
            <Logo style="w-96 h-96" />
            <p class="text-lg">Loading SHD...</p>
        </div>
    </div>
