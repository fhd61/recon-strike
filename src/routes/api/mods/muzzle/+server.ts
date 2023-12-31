import type { IItem } from "$lib/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        name: "Compensador",
        description:
            "Ganha +1 no acerto e +1 de dano",
    },
    {
        name: "Silenciador",
        description:
            "Quando disparar o barulho da arma e reduzindo, assim não alertando os inimigos, mas a arma recebe -1 de dano. Se tiver um inimigo a 2 metros de você ele ainda será alertado",
    },
]
