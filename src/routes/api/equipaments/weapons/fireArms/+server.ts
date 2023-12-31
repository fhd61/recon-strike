import type { IWeapon } from "$lib/interface/IWeapon"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IWeapon[] = [
    {
        name: "Rifle de Assalto",
        hit: "1d20",
        modifier: "INT/2",
        damage: "1d8",
        range: 10,
        critValue: 20,
        critMult: 1.5
    },
    {
        name: "Submetralhadora",
        hit: "1d20",
        modifier: "AGI/2",
        damage: "1d6",
        range: 7,
        critValue: 20,
        critMult: 1.2
    },
    {
        name: "Escopeta",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d10",
        range: 5,
        critValue: 20,
        critMult: 1.4
    },
    {
        name: "Pistola",
        hit: "1d20",
        modifier: "AGI/2",
        damage: "1d4",
        range: 8,
        critValue: 20,
        critMult: 1.5
    },
    {
        name: "Rifle de Precisão",
        hit: "1d20",
        modifier: "INT/2",
        damage: "1d10",
        range: 20,
        critValue: 20,
        critMult: 1.8
    },
    {
        name: "LMG",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d6",
        range: 9,
        critValue: 20,
        critMult: 1.5
    },
]
