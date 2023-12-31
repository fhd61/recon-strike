import type { IItem } from "$lib/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        name: "Adepto",
        description:
            "Suas recebem -1 no dado de critico para suas habilidades",
    },
]
