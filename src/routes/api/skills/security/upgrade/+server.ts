import type { ISkill } from "$lib/types/interface/ISkill";

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: ISkill[] = [
    {
        icon: "https://i.imgur.com/RMC3v5z.png",
        name: "Crusader",
        description: "Puxa um escudo que conta como cover médio, enquanto estiver segurando usar submetralhadoras, mas ele só protege o seu peito",
        cooldown: 4,
        hp: { currentValue: 20, maxValue: 20, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/RNJH7vc.png",
        name: "Defletor",
        description: "Puxa um escudo que conta como cover médio, quando um alvo acertar o seu escudo rode um 1d20 contra a CA do alvo para o disparo voltar e a certar o alvo",
        cooldown: 5,
        hp: { currentValue: 15, maxValue: 15, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/NQ7hJa2.png",
        name: "Reforçado",
        description: "Versão melhorada do escudo balístico básico, em quanto estiver usando conta como cover pesado mas perde -5 de deslocamento devido ao peso",
        cooldown: 5,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/V8lQJrV.png",
        name: "Contramedida",
        description: "Quando um inimigo acerta o cover fica marcado pra você e seus aliados, as rolagens contra ele são feitas com vantagem",
        cooldown: 5,
        hp: { currentValue: 10, maxValue: 10, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/fCkxhUv.png",
        name: "Conver Expandido",
        description: "Aumenta o tamanho do cover, agora 2 pessoas podem usar",
        cooldown: 5,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/xCReqT0.png",
        name: "Cover Explosivo",
        description: "Quando usar essa cover e for afetado por uma explosão você roda o mesmo dado de dano da explosão, o valor vai ser quanto de dano vai ser negado, mas apoios isso o cover e destruído",
        cooldown: 5,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/rXjDMm6.png",
        name: "Cover Curativo",
        description: "Cura você e os seus aliados que estiverem usando o mesmo cover em 1d4 + VIG/2 por turno que estiverem ativamente usando o cover, essa habilidade não modifica a CA do cover, mas ele pode ser usada em cover portátil",
        cooldown: 4,
        duration: 3,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        currentCooldown: 0,
    },
    {
        icon: "https://i.imgur.com/X03Gpy4.png",
        name: "Cover Inteligente",
        description: "Aumenta o modificador de critico da sua arma e dos seus aliados que estão ativamente no cover em 0.2 e o dano e rolando com vantagem, se algum inimigo usar o cover melhorado por essa habilidade todas as rolagens dele vão ser feitas com desvantagem",
        cooldown: 6,
        duration: 4,
        hp: { currentValue: 30, maxValue: 30, bonus: {} },
        currentCooldown: 0,
    },
]
