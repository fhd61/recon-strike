<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let showModal = false;

    let dialog: HTMLDialogElement;
    const dispatcher = createEventDispatcher();

    $: {
        if (dialog && showModal) {
            dialog.showModal();
            dispatcher("ModalOpen");
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => {
        dialog.close();
        dispatcher("ModalClose");
    }}
    class="polygonL"
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot name="header" />
        <slot />
    </div>
</dialog>

<style>
    dialog {
        @apply bg-zinc-900 text-white;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
