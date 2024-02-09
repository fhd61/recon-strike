import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon:"https://i.imgur.com/xzvtQ47.png",
        name: "ACOG 4X",
        description: "Aumenta o alcance em 1m quando disparar mirando e ganha -1 no dado de critico",
        attToModify: { critHit: -1, damage: 1 }
    },
    {
        icon:"https://i.imgur.com/xzvtQ47.png",
        name: "Holo Sight",
        description:"Ganha -2 no dado de critico",
        attToModify: { critHit: -2 }
    },
    {
        icon:"https://i.imgur.com/xzvtQ47.png",
        name: "Scope 8x",
        description: "Aumenta o alcance em 3m quando disparar mirando e ganha -1 no dado de critico",
        attToModify: { range: 3 }
    },
    {
        icon:"https://i.imgur.com/xzvtQ47.png",
        name: "Red Dot",
        description: "Ganha +1 de acerto e aumento o multiplicador de critico em 0.2",
        attToModify: { hit: 1, critMut: 0.2}
    },
]
