<script lang="ts">
</script>

<button >
	<div class="relative flex items-center justify-center">
		<img
			class="absolute -translate-y-2"
			width="100"
			height="100"
			src="https://publish-01.obsidian.md/access/b3859d7f7d98eae1e5a77f4775c9d418/Assets/Imagens/Icones/Skills/Mobile_Cover.webp"
			alt=""
		/>
		<span class="absolute translate-y-5">3</span>
		<progress value={3} max={5} class="w-16 h-16" />
	</div>
</button>

<style>
	/*Bar*/
	progress {
		@apply bg-orange-700/30;
	}
	progress::-webkit-progress-value {
		@apply bg-orange-700/30;
	}

	/*Background*/
	progress::-webkit-progress-bar {
		@apply bg-slate-700/60;
	}
	progress::-moz-progress-bar {
		@apply bg-slate-700/60;
	}
</style>
