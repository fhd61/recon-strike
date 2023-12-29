import type { IItem } from "$lib/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: "https://i.imgur.com/Tkl0eyo.png",
        name: "Akimbo",
        description:
            "Pode usar duas armas pequenas ao mesmo tempo -3 de acerto se for duas pistolas, **-4** de acerto se for duas submetralhadoras",
    },
    {
        icon: "https://i.imgur.com/AvJE6iG.png",
        name: "Anjo",
        description:
            "Uma vez por combate pode estabilizar um aliado com 0 de vida que tenha falhado em pelo menos um teste de morte, após estabilizar esse aliando volta a vida com 5 de vida",
    },
    {
        icon: "https://i.imgur.com/1PUuRNh.png",
        name: "Brigão",
        description:
            "Seus ataques corpo a corpo são rolados com vantagem no acerto se for mais forte que o alvo",
    },
    {
        icon: "https://i.imgur.com/euXNRLF.png",
        name: "Caçador",
        description:
            "Ganha +1 no dado de acerto e rola o dano com vantagem se o alvo estiver a 10 metros ou mais de você",
    },
    {
        icon: "https://i.imgur.com/blGyThw.png",
        name: "Campeão de tiro",
        description:
            "Pode usar o valor total do modificador de acerto da sua arma",
    },
    {
        icon: "https://i.imgur.com/sGxCNlV.png",
        name: "Carregador",
        description:
            "Pode carregar duas armas principais, mas gasta uma ação pra trocar entre elas",
    },
    {
        icon: "https://i.imgur.com/vo2glQp.png",
        name: "Especialista em Habilidades",
        description:
            "Diminui o tempo de recarga de todas as Habilidades em 1 turno",
    },
    {
        icon: "https://i.imgur.com/eTt7X7A.png",
        name: "GunFu",
        description:
            "Quando usar uma arma de CQB(Escopeta, Pistola, Submetralhadoras) a numa distancia de corpo a corpo você não roda com desvantagem e ganha +2 no acerto",
    },
    {
        icon: "https://i.imgur.com/utkvXxs.png",
        name: "Líder do Esquadrão",
        description:
            "Uma vez por a cada 3 turnos pode dar um comando para algum aliando e as próximas rolagens serram feitas com vantagem",
    },
    {
        icon: "https://i.imgur.com/rZNZfMl.png",
        name: "Medico de Campo",
        description:
            "Todas as suas habilidades de cura ganha um bônus de +2",
    },
    {
        icon: "https://i.imgur.com/pQAc21t.png",
        name: "Melhor da turma",
        description:
            "Você pode escolher outro atributo entre FOR, INT para ser usado no calculo da sua CA em vez de AGI",
    },
    {
        icon: "https://i.imgur.com/nuBqLlj.png",
        name: "Noção de Campo",
        description:
            "Todo inicio de turno roda 1d4 para checar se a algo que possa usar ao seu favor. Tabela de resultados",
    },
    {
        icon: "https://i.imgur.com/IXyXLE0.png",
        name: "Pensamento Rápido",
        description:
            "Ganha +3 em teste de AGI para reagir a algo como desviar de um objeto ou se mover para outro cover no meio de uma troca de tiros",
    },
    {
        icon: "https://i.imgur.com/SBfkSNw.png",
        name: "Tiro fatal",
        description:
            "Soma o modificador de acerto/2 da sua arma no dano dela. Ex: 1d8 + INT/2",
    },
]
