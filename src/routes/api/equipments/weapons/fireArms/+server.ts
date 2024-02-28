import * as myIcons from "$lib/myIcons"
import type { IWeapon } from "$lib/types/interface/IWeapon"

export function GET() {
    return new Response(JSON.stringify(content))
}

const content: IWeapon[] = [
    {
        icon: myIcons.weaponIcons.assaultRifle,
        name: "Rifle de Assalto",
        hit: "1d20",
        modifier: "int",
        damage: "1d8",
        range: 10,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        icon: myIcons.weaponIcons.submachineGun,
        name: "Submetralhadora",
        hit: "1d20",
        modifier: "agi",
        damage: "1d6",
        range: 7,
        critValue: 20,
        critMut: 1.2,
        bonus: {}
    },
    {
        icon: myIcons.weaponIcons.shotGun,
        name: "Escopeta",
        hit: "1d20",
        modifier: "for",
        damage: "1d10",
        range: 5,
        critValue: 20,
        critMut: 1.4,
        bonus: {}
    },
    {
        icon: myIcons.weaponIcons.pistol,
        name: "Pistola",
        hit: "1d20",
        modifier: "agi",
        damage: "1d4",
        range: 8,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
    {
        icon: myIcons.weaponIcons.sniperRifle,
        name: "Rifle de Precisão",
        hit: "1d20",
        modifier: "int",
        damage: "1d10",
        range: 20,
        critValue: 20,
        critMut: 1.8,
        bonus: {}
    },
    {
        icon: myIcons.weaponIcons.lmg,
        name: "LMG",
        hit: "1d20",
        modifier: "for",
        damage: "1d6",
        range: 9,
        critValue: 20,
        critMut: 1.5,
        bonus: {}
    },
]
