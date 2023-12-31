import type { IItem } from "$lib/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        name: "ACOG 4X",
        description:
            "Aumenta o alcance em 1m quando disparar mirando e ganha -1 no dado de critico",
    },
    {
        name: "Holo Sight",
        description:
            "Ganha -2 no dado de critico",
    },
    {
        name: "Scope 8x",
        description:
            "Aumenta o alcance em 3m quando disparar mirando e ganha -1 no dado de critico",
    },
    {
        name: "Red Dot",
        description:
            "Ganha +1 de acerto e aumento o multiplicador de critico em 0.2",
    },
]
