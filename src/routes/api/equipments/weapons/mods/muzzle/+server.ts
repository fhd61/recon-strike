import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: "https://i.imgur.com/hcswqce.png",
        name: "Compensador",
        description: "Ganha +1 no acerto e +1 de dano",
        attToModify: { hit: 1, damage: 1 }
    },
    {
        icon: "https://i.imgur.com/hcswqce.png",
        name: "Silenciador",
        description: "Quando disparar o barulho da arma e reduzindo, assim não alertando os inimigos, mas a arma recebe -1 de dano. Se tiver um inimigo a 2 metros de você ele ainda será alertado",
        attToModify: { damage: -1 }
    },
]
