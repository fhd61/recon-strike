import type { ISkill } from "$lib/types/interface/ISkill";

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: ISkill[] = [
    {
        icon: "https://i.imgur.com/12lBtfx.png",
        name: "Estação de suporte",
        description: "Coloca uma estação de cura no chão e cura os aliados na área em 1d4 por turno",
        cooldown: 5,
        duration: 4,
        range: 2,
        rangeArea: 6,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/Qb7bVNj.png",
        name: "Primeiros Socorros",
        description: "Ativa uma cura individual ou dispara em um aliado, curando 1d6",
        cooldown: 3,
        range: 2,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/IkY6lzz.png",
        name: "Pulso",
        description: "Mostra se a inimigos numa área e marca eles, só para você",
        cooldown: 5,
        range: 10,
        currentCooldown: 0,
    },
]
