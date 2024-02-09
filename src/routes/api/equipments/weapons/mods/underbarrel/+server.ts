import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: "https://i.imgur.com/1NKNByf.png",
        name: "Lanterna",
        description: "Quando ativa não ganha desvantagem ao atirar no escuro",
    },
    {
        icon: "https://i.imgur.com/1NKNByf.png",
        name: "Mira Laser",
        description: "Ganha +1 de acerto, e quando mirar e objeto ou parte do corpo especifica não roda com desvantagem, isso só e valido no se o alvo estiver no alcance da arma",
        attToModify: { hit: 1 }
    },
    {
        icon: "https://i.imgur.com/1NKNByf.png",
        name: "Trié",
        description: "Pode apoiar sua arma numa superfície, para ganhar +3 no acerto e roda o dano com vantagem",
        attToModify: { hit: 3 }
    },
]
