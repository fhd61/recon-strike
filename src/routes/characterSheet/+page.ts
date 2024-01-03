import type { IItem } from '$lib/types/interface/IItem.js';
import type { ISkill } from '$lib/types/interface/ISkill.js';
import type { IWeapon } from '$lib/types/interface/IWeapon.js';

export async function load({ fetch }) {
    async function getData(url: string) {
        let data;
        let fetchRes = await fetch(url)

        data = await fetchRes.json()

        return data
    }

    //Talents
    let p_talents = await getData("api/ptalents") as IItem[];
    let w_talents = await getData("api/wtalents") as IItem[];

    //Equipaments
    let armor = await getData("api/equipments/armor") as IItem[];
    let fireArms = await getData("api/equipments/weapons/fireArms") as IWeapon[];
    let melee = await getData("api/equipments/weapons/melee") as IWeapon[];

    //Skills
    let tech = await getData("api/skills/tech") as ISkill[];
    let security = await getData("api/skills/security") as ISkill[];
    let medical = await getData("api/skills/medical") as ISkill[];

    return {
        defaults: {
            charTalents: p_talents,
            skills: {
                tech,
                security,
                medical
            },
            equipments: {
                armor,
                fireArms,
                melee,
                weaponsTalents: w_talents
            }
        }
    }
}
