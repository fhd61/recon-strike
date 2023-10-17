<script>
	import { onMount } from "svelte";
  import "../app.css";

  onMount(function(){
    document.addEventListener("TurnEnd", () => console.log("OK"))
  })
</script>

<div class="p-1">
  <slot />
</div>