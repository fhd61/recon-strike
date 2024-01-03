import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: "https://i.imgur.com/Tkl0eyo.png",
        name: "Akimbo",
        description:
            "Pode usar duas armas pequenas ao mesmo tempo -3 de acerto se for duas pistolas, **-4** de acerto se for duas submetralhadoras",
    },
]
