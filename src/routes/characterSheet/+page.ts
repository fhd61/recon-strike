import type { IItem } from '$lib/types/interface/IItem.js';
import type { ISkill } from '$lib/types/interface/ISkill.js';
import type { IWeapon } from '$lib/types/interface/IWeapon.js';

export async function load({ fetch }) {
    async function getData(url: string) {
        const fetchRes = await fetch(url)

        const data = await fetchRes.json()

        return data
    }

    //Talents
    const p_talents = await getData("api/ptalents") as IItem[];

    const equipments = {
        armor: await getData("api/equipments/armor") as IItem[],
        grenades: await getData("api/equipments/grenades") as IItem[],
        fireArms: await getData("api/equipments/weapons/fireArms") as IWeapon[],
        melee: await getData("api/equipments/weapons/melee") as IWeapon[],
        w_talents: await getData("api/wtalents") as IItem[],
        mods: {
            muzzles: await getData("api/equipments/weapons/mods/muzzle") as IItem[],
            optics: await getData("api/equipments/weapons/mods/optics") as IItem[],
            underbarrel: await getData("api/equipments/weapons/mods/underbarrel") as IItem[]
        }
    }

    const skills = {
        tech: await getData("api/skills/tech") as ISkill[],
        security: await getData("api/skills/security") as ISkill[],
        medical: await getData("api/skills/medical") as ISkill[],
        upgrades: {
            tech: await getData("api/skills/tech/upgrade") as ISkill[],
            security: await getData("api/skills/security/upgrade") as ISkill[],
            medical: await getData("api/skills/medical/upgrade") as ISkill[]
        }
    }

    return {
        defaults: {
            charTalents: p_talents,
            skills,
            equipments
        }
    }
}
