<script lang="ts">
    import { goto } from "$app/navigation";
    import typewriter from "$lib/animations/typewriter.js";
    import Logo from "$lib/components/logo.svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let loadingTexts = [
        "",
        "Download armory data...",
        "Import SHD resources...",
        "Connecting to ISSAC...",
        "Loading SHD dashboard...",
    ];
    let textIndex = 0;

    onMount(() => {
        setInterval(() => {
            if (textIndex === loadingTexts.length - 1) return;
            else textIndex++;
        }, 1300);

        setTimeout(() => {
            goto("/characters");
        }, loadingTexts.length * 1300);
    });
</script>

<svelte:head>
    <title>SHD {textIndex === loadingTexts.length - 1 ? "" : "- Loading"}</title>
</svelte:head>

<div
    class="flex justify-center items-center h-screen text-white"
    in:fade
    out:fade
>
    <div class="flex flex-col justify-center items-center text-center">
        <Logo style="w-96 h-96" />
        <div class="h-16">
            {#key textIndex}
                <p in:typewriter={{speed: 30}} class="text-lg h-full">
                    {loadingTexts[textIndex]}
                </p>
            {/key}
        </div>
    </div>
</div>
