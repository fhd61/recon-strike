<script lang="ts">
    import * as Collapsible from "$lib/components/ui/collapsible";
    import type { IItem } from "$lib/interface/IItem";
    import {marked} from 'marked';

    export let data: IItem;
    $: htmlDescription = marked(data.description);
</script>

<Collapsible.Root>
    <Collapsible.Trigger class="w-full">
        <div class="flex items-center bg-zinc-900 px-2 polygonL">
            <img src={data.icon} width="52" alt="" class="mr-4" />
            <h1 class="text-xl flex">{data.name}</h1>
        </div>
    </Collapsible.Trigger>
    <Collapsible.Content
        class="bg-zinc-900 px-2 pt-4 pb-2 -translate-y-4 polygonL text-sm"
    >
        {@html htmlDescription}
    </Collapsible.Content>
</Collapsible.Root>
