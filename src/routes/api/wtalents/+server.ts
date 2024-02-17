import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: "https://i.imgur.com/DnRhACR.png",
        name: "Adepto",
        description: "Suas recebem -1 no dado de critico para suas habilidades",
        attToModify: { critHit: -1 }
    },
    {
        icon: "https://i.imgur.com/6rOuAoq.png",
        name: "Agressivo",
        description: "Quando estiver no alcance de corpo a corpo ganha +1 de dano",
        attToModify: { meleeDamage: 1 }
    },
    {
        icon: "https://i.imgur.com/uaZre4u.png",
        name: "Brutal",
        description: "Ganha +1 na rolagem de dano",
        attToModify: { damage: 1 }
    },
    {
        icon: "https://i.imgur.com/dSNgPR1.png",
        name: "Competente",
        description: "Após usar uma habilidade ganha +1 acerto",
        attToModify: { hit: 1 }
    },
    {
        icon: "https://i.imgur.com/TJARMeI.png",
        name: "Destrutivo",
        description: "Quanto atacar um alvo o seu dano ignora 1 de defesa dele",
    },
    {
        icon: "https://i.imgur.com/g10Xinf.png",
        name: "Feroz",
        description: "Quando atacar um alvo fora de cobertura ganha +1 de acerto e +1 de dano",
    },
    {
        icon: "https://i.imgur.com/zEh7PB9.png",
        name: "Focado",
        description: "Ganha +2 de acerto quando atacar um alvo fora de cover",
    },
    {
        icon: "https://i.imgur.com/9xt0g0B.png",
        name: "Intenso",
        description: "Quando atacar um alvo rode 1d2 se cair 2 o seu e considerado um critico caso cair 1 você só da metade do dano",
    },
    {
        icon: "https://i.imgur.com/1M5kVVq.png",
        name: "Mortal",
        description: "Suas recebem -1 no dado de critico",
        attToModify: { critHit: -1 }
    },
    {
        icon: "https://i.imgur.com/Lv2r2RK.png",
        name: "Perícia Mortal",
        description: "Quando você estiver em cobertura ganha +1 de acerto e +1 de dano",
    },
    {
        icon: "https://i.imgur.com/USqGVQ3.png",
        name: "Preciso",
        description: "Ganha +1 na rolagem de acerto",
        attToModify: { hit: 1 }
    },
    {
        icon: "https://i.imgur.com/NFWU1IL.png",
        name: "Preparado",
        description: "Acertar uma alvo que foi atingindo por um aliado no turno anterior, você roda o dano com vantagem",
    },
]
