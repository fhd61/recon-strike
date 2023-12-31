import type { ISkill } from "$lib/interface/ISkill";

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: ISkill[] = [
    {
        icon: "https://i.imgur.com/w5sPyEs.png",
        name: "Mina Pagajos",
        description: "Lança uma mina que gruda em qualquer superfície ou pessoa e explode num raio causando 1d8 e os alvos no raio da explosão tem -1 de defesa",
        cooldown: 4,
        range: 4,
        rangeArea: 2,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/xl33Tef.png",
        name: "Mina Perseguidora",
        description: "Coloca uma esfera no chão que escolhe um inimigo dentro da área e se move na direção do alvo e explode causado 1d8 de dano os alvos na área da explosão recebem -2 de defesa",
        cooldown: 5,
        range: 5,
        rangeArea: 3,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/m8E45qo.png",
        name: "Sentinela",
        description: "Coloca uma turret que ataca um alvo dentro da uma área todo inicio de turno ou pode suprimir um alvo. causa 1d4 de dano",
        cooldown: 4,
        range: 2,
        rangeArea: 6,
        currentCooldown: 0,
    },
]
