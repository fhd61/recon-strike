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
    const w_talents = await getData("api/wtalents") as IItem[];

    //Equipaments
    const armor = await getData("api/equipments/armor") as IItem[];
    const fireArms = await getData("api/equipments/weapons/fireArms") as IWeapon[];
    const melee = await getData("api/equipments/weapons/melee") as IWeapon[];

    //Skills
    const tech = await getData("api/skills/tech") as ISkill[];
    const security = await getData("api/skills/security") as ISkill[];
    const medical = await getData("api/skills/medical") as ISkill[];

    //Skills upgrades
    const techUpgrades = await getData("api/skills/tech/upgrade") as ISkill[];
    const securityUpgrades = await getData("api/skills/security/upgrade") as ISkill[];
    const medicalUpgrades = await getData("api/skills/medical/upgrade") as ISkill[];

    return {
        defaults: {
            charTalents: p_talents,
            skills: {
                tech,
                security,
                medical,
                upgrades: {
                    tech: techUpgrades,
                    security: securityUpgrades,
                    medical: medicalUpgrades
                }
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
