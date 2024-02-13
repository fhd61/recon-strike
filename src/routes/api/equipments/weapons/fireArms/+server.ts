import type { IWeapon } from "$lib/types/interface/IWeapon"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IWeapon[] = [
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/Assault_Icon.webp",
        name: "Rifle de Assalto",
        hit: "1d20",
        modifier: "INT",
        damage: "1d8",
        range: 10,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/SMG_Icon.webp",
        name: "Submetralhadora",
        hit: "1d20",
        modifier: "AGI",
        damage: "1d6",
        range: 7,
        critValue: 20,
        critMut: 1.2,
        bonus: {}
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/Shotgun_Icon.webp",
        name: "Escopeta",
        hit: "1d20",
        modifier: "FOR",
        damage: "1d10",
        range: 5,
        critValue: 20,
        critMut: 1.4,
        bonus: {}
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/Pistol_Icon.webp",
        name: "Pistola",
        hit: "1d20",
        modifier: "AGI",
        damage: "1d4",
        range: 8,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/Marskman_Icon.webp",
        name: "Rifle de Precisão",
        hit: "1d20",
        modifier: "INT",
        damage: "1d10",
        range: 20,
        critValue: 20,
        critMut: 1.8,
        bonus: {}
    },
    {
        icon:"https://uhsavcywrzkrmgossgif.supabase.co/storage/v1/object/public/icons/Weapons/LMG_Icon.webp",
        name: "LMG",
        hit: "1d20",
        modifier: "FOR",
        damage: "1d6",
        range: 9,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
]
