<script>
</script>

<div class="grid grid-cols-2 grid-rows-3 space-y-1">
    <div class="flex col-span-2">
        <input
            class="w-28 pl-1 bg-zinc-800 capitalize"
            placeholder="Nome"
            type="text"
        />
        <select id="mods" class="mx-1 capitalize bg-zinc-800">
            <option value="agi">agilidade</option>
            <option value="for">força</option>
            <option value="int">intelecto</option>
            <option value="vig">vigor</option>
            <option value="speed">velocidade</option>
            <option value="def">defesa</option>
            <option value="ac">CA</option>
            <option value="hp">vida</option>
        </select>
    </div>
    <div class="flex col-span-2">
        <input class="w-28 pl-1 bg-zinc-800" placeholder="valor" type="text" />
        <input
            class="w-[7.6rem] pl-1 mx-1 bg-zinc-800"
            placeholder="tempo"
            type="number"
        />
    <button class="w-9 p-1 bg-orange-800 active:bg-orange-600">❌</button>
    </div>
</div>
