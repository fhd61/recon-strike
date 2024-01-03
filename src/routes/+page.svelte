<script lang="ts">
    import Logo from "$lib/components/logo.svelte";
    import { fade, slide } from "svelte/transition";

    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

</script>

<svelte:head>
    <title>SHD - Loading</title>
</svelte:head>

<div class="flex justify-center items-center h-screen text-white" in:fade>
    <div class="flex flex-col justify-center items-center">
    <Logo width="w-96" height="h-96"/>
    <p class="text-lg">SHD Loading...</p>
    </div>
</div>