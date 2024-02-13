import type { ISkill } from "$lib/types/interface/ISkill";

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: ISkill[] = [
    {
        icon: "https://i.imgur.com/USqIxPo.png",
        name: "Escudo Balístico",
        description: "Puxa um escudo que conta como cover médio, enquanto estiver segurando ele você pode usar pistolas e uma penalidade de -3 de deslocamento em quanto estiver usando",
        cooldown: 4,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        attToModify: { ga: 2 },
        currentCooldown: 4,
    },
    {
        icon: "https://i.imgur.com/PW6l4Yn.png",
        name: "Cover Portátil",
        description: "Coloca uma parede que não pode ser movida depois de usada, essa parede e um cover pesado. Você pode cancelar ela mas terrar que esperar o tempo de recargar para usar de novo",
        cooldown: 3,
        attToModify: { ga: 3 },
        hp: { currentValue: 20, maxValue: 20, bonus: {} },
        currentCooldown: 4,
    },
    {
        icon: "https://i.imgur.com/OHQRH2S.png",
        name: "Melhorar Cover",
        description: "Usa uma aparelho para reforça que reforça cover que esta usando, adiciona +1 no bônus do cover",
        attToModify: { ga: 1 },
        cooldown: 4,
        duration: 3,
        currentCooldown: 4,
    },
]
