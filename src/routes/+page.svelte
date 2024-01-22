<script lang="ts">
    import { goto } from "$app/navigation";
    import typewriter from "$lib/animations/typewriter.js";
    import Logo from "$lib/components/logo.svelte";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    export let data;

    let { supabase } = data;
    $: ({ supabase } = data);

    let loadingTexts = [
        "Download armory data",
        "Import SHD resources",
        "Connecting to ISSAC",
        "Loading SHD dashboard",
    ];
    let textIndex = 0;

    onMount(() => {
        setInterval(() => {
            if (textIndex === loadingTexts.length - 1) return;
            else textIndex++;
        }, 3000);

        isLogged();
    });

    async function signInWithDiscord() {
        await supabase.auth.signInWithOAuth({
            provider: "discord",
        });
    }

    async function isLogged() {
        const session = await supabase.auth.getSession();

        if (session) {
            goto("/characters");
        } else {
            console.log("User is not logged in");
        }
    }
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
        <div class="h-16">
            {#if textIndex === loadingTexts.length - 1}
                <form action="">
                    <button
                        in:slide
                        on:click={signInWithDiscord}
                        type="submit"
                        class="flex justify-center items-center h-full w-72 p-1 bg-orange-600 polygonL hover:bg-orange-700 active:bg-orange-500 transition-all"
                    >
                        <Icon
                            icon="ic:baseline-discord"
                            width="52"
                            class="mr-2"
                        />
                        <span class="font-semibold text-lg"
                            >Login com Discord</span
                        >
                    </button>
                </form>
            {:else}
                {#key textIndex}
                    <p in:typewriter={{ delay: 500 }} class="text-lg h-full">
                        {loadingTexts[textIndex]}...
                    </p>
                {/key}
            {/if}
        </div>
    </div>
</div>
