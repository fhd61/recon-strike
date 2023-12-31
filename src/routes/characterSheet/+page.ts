import type { IItem } from '$lib/interface/IItem.js';

export async function load({ fetch }) {
    async function getData(url: string) {
        let data:IItem[];
        let fetchRes = await fetch(url)

        data = await fetchRes.json()

        return data
    }

    //Talents
    let p_talents = await getData("api/ptalents");
    let w_talents = await getData("api/wtalents");
    
    //Equipaments
    let armor = await getData("api/equipaments/armor");
    let fireArms = await getData("api/equipaments/weapons/fireArms");
    let melee = await getData("api/equipaments/weapons/melee");

    //Skills
    let tech = await getData("api/skills/tech");
    let security = await getData("api/skills/security");
    let medical = await getData("api/skills/medical");

    return {
        defaults: {
            charTalents: p_talents,
            skills: {
                tech,
                security,
                medical
            },
            equipaments: {
                armor,
                fireArms,
                melee,
                weaponsTalents: w_talents
            }
        }
    }
}
