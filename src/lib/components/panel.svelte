<script lang="ts">
    export let title:string
</script>

<div class="bg-gray-100/5 w-fit h-fit backdrop-blur-sm pb-2 text-white">
    <h1 class="bg-gray-100/5 border-b-2 border-orange-600/70 pl-2 mb-2 font-bold">{title}</h1>
    <slot/>
</div>