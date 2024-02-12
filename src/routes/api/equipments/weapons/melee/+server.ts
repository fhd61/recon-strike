import type { IWeapon } from "$lib/types/interface/IWeapon"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IWeapon[] = [
    {
        name: "Machado",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d6",
        damageType: "Corte",
        range: 2,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        name: "Faca",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d4",
        damageType: "Corte",
        range: 1,
        critValue: 20,
        critMut: 1.7,
        bonus: {}
    },
    {
        name: "Bastão Retrátil",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d6",
        damageType: "Contusão",
        range: 2,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        name: "Soco",
        hit: "1d20",
        modifier: "FOR/2",
        damage: "1d4",
        damageType: "Contusão",
        range: 2,
        critValue: 20,
        critMut: 1.7,
        bonus: {}
    },
]
