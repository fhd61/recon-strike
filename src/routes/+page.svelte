<script lang="ts">
	import Panel from '$lib/components/panel.svelte';
	import SkillBtn from '$lib/components/skillBtn.svelte';
	export let data: any;

	console.log(data);
</script>

<div></div>

<Panel title="Atributos">
	<div class="grid grid-cols-2 gap-x-1 gap-y-2 text-center">
		<label class="w-20">
			AGI <input type="number" value="0" class="bg-gray-100/10 w-10" />
		</label>
		<label class="w-20">
			INT <input type="number" value="0" class="bg-gray-100/10 w-10" />
		</label>
		<label class="w-20">
			FOR <input type="number" value="0" class="bg-gray-100/10 w-10" />
		</label>
		<label class="w-20">
			VIG <input type="number" value="0" class="bg-gray-100/10 w-10" />
		</label>
	</div>
</Panel>
<Panel title="Habilidades">
	<SkillBtn />
	<SkillBtn />
</Panel>
