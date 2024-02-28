import { grenadesIcons } from "$lib/myIcons"
import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon: grenadesIcons.incendiary,
        name: "Granada Incendiaria",
        description: "Gera uma área de chamas num raio de 3 causando 1d4 de dano por turno que algum inimigo estiver na área, dura 3 turnos",
    },
    {
        icon: grenadesIcons.frag,
        name: "Granada de Fragmentação",
        description: "Explode numa are de 3 e causa 1d6 de dano aos alvos atingidos",
    },
    {
        icon: grenadesIcons.smoke,
        name: "Granada de Fumaça",
        description:
            "Faz uma cortina de fumaça de tamanho 3m, quando tentar atacar um alvo do outro lado ou dentro da fumaça rode o aceto com desvantagem, se o alvo estiver marcado a rolagem e normal, dura 4 turnos",
    },
    {
        icon: grenadesIcons.flashBang,
        name: "Flash Bang",
        description: "Atordoa os alvos numa área de 4 os alvos afetados fazem todas as rolagens com desvantagem, o efeito dura 2 turnos",
    },
]