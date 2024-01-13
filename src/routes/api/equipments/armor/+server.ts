import type { IItem } from "$lib/types/interface/IItem"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IItem[] = [
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Armor/Armor_Icon.webp",
        name: "Colete Leve",
        description:
            "Proporciona 2 pontos de defesa e concede um bônus de +1 em AGI, INT ou FOR",
        attToModify:{ "def": 2 }
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Armor/Armor_Icon_1.webp",
        name: "Colete Médio",
        description:
            "Proporciona 3 pontos de defesa e reduz em 1 o tempo de recarga das suas habilidades",
        attToModify:{ "def": 3 }
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Armor/Armor_Icon_2.webp",
        name: "Colete Pesado",
        description:
            "Garante 5 pontos de defesa, aumenta seu HP em +2 e diminui o deslocamento em -3",
        attToModify:{ "def": 5, "hp": 2, "speed": -3 }
    },
]
