import type { ISkill } from "$lib/types/interface/ISkill";

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: ISkill[] = [
    {
        icon: "https://i.imgur.com/1qxDh3l.png",
        name: "Imunizador",
        description: "Coloca uma estação de cura no chão e cura os aliados na área em 1d4 por turno, caso você ou um aliado na área de cura for atingindo por qualquer tipo de CC, roda 1d2 se tiver um sucesso o CC não será aplicado",
        cooldown: 6,
        duration: 5,
        range: 2,
        rangeArea: 4,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/ow6yWtZ.png",
        name: "Recarga",
        description: "Coloca uma estação de cura no chão e cura os aliados na área em 1d4 por turno, no inicio do turno você ou um aliado rodam 2d2 com sucesso nos 2 dados diminui em 1 a recarga de todas as habilidades exceto a estação de recarga, isso só afeta quem estiver na área de efeito",
        cooldown: 5,
        range: 2,
        duration: 4,
        rangeArea: 4,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/pzFZjJE.png",
        name: "Adrenalina",
        description: "Ativa uma cura individual ou dispara em um aliado, curando 1d6 e dá um bônus de +2 de acerto e aumenta o deslocamento em +1",
        cooldown: 4,
        range: 4,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/FTUg6m7.png",
        name: "Primeiros Socorros++",
        description: "Ativa uma cura numa pequena área, curando 1d6 + VIG/2",
        cooldown: 4,
        range: 5,
        rangeArea: 2,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/CAIrh0A.png",
        name: "Escâner Tático",
        description: "Você roda o acerto com vantagem em todos os inimigos marcados e escolhe um deles que os seus aliados vão rodar o acerto com vantagem quando atacar ele",
        cooldown: 4,
        range: 8,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/bUsuV0I.png",
        name: "Ocultador",
        description: "Escode você e seus aliados de qualquer tecnologia que possa ver vocês que esteja no alcance do pulso, e marca os inimigos na área só para você",
        cooldown: 5,
        range: 10,
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/FvPJGcU.png",
        name: "Reconhecimento",
        description: "Mostra se a inimigos numa área e marca eles, para você e seus aliados",
        cooldown: 6,
        range: 20,
        currentCooldown: 0,
    },
]
