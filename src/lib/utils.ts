import { get } from "svelte/store";
import { CharacterSheet, EAttribute, type ICharacter } from "./store/character";
import type { IItem } from "./types/interface/IItem";
import type { IWeapon } from "./types/interface/IWeapon";
import type { IBonus } from "./types/interface/IBonus";
import type { ISkill } from "./types/interface/ISkill";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { IAttribute } from "./types/interface/IBaseAttribute";

export class MathUtils {
    static randomNumber(max: number) {
        return Math.ceil(Math.random() * max)
    }

    static clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }
}

export class WeaponsUtils {
    static totalBonusOf(name: string, weapon: IWeapon) {
        let bonus = 0

        for (const key in weapon.bonus) {
            if (!(name in weapon.bonus[key]))
                continue;

            bonus += weapon.bonus[key][name]
        }

        const talents = weapon.talents
        if (talents === undefined)
            return bonus
            console.log(talents)

        for (let i = 0; i < talents.length; i++) {
            if (talents[i].attToModify === undefined)
                continue;
            if (!(name in talents[i].attToModify!))
                continue;

            bonus += talents[i].attToModify[name]
        }

        return bonus
    }

    static getAttributeModifier(weapon: IWeapon) {
        const attName = weapon.modifier.toLocaleLowerCase().split("/");
        const att = EAttributeUtils.stringToAttribute(attName[0]);
        const mod = (CharacterUtils.getAttribute(att) as IAttribute).value;

        return mod;
    }

    static bonusBaseOnTalent(talent: "Campeão de tiro" | "Tiro fatal", weapon: IWeapon) {
        const hasTalent = get(CharacterSheet).talents.find((t) => t.name == talent) !== undefined
        
        if (hasTalent)
            return this.getAttributeModifier(weapon)

        return 0
    }

    static checkForTalent(talent: "Campeão de tiro" | "Tiro fatal") {
        return get(CharacterSheet).talents.find((t) => t.name == talent) !== undefined
    }
}

export class StringUtils {
    static parseDiceNotation(text: string) {
        const regex = /^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i;
        const match = text.match(regex);

        if (!match) {
            throw new Error(`Invalid dice notation format: ${text}`);
        }

        const [, numberOfDice, diceType, modifiers] = match;

        const rollTimes = numberOfDice ? parseInt(numberOfDice) : 1;
        const sides = parseInt(diceType);

        const parsedModifiers = modifiers ? modifiers.match(/[+-]?\s*\d+/g) || [] : [];
        const modifierValues = parsedModifiers.map(modifier => parseInt(modifier.replace(/\s+/g, "")));

        const modifierSum = modifierValues.reduce((total, modifier) => total + modifier, 0);

        return {
            sides,
            rollTimes,
            modifierSum
        };
    }
}

export class EAttributeUtils {
    static stringToAttribute(value: string) {
        const attribute: EAttribute | undefined = EAttribute[value as keyof typeof EAttribute];

        if (attribute !== undefined) {
            return attribute
        } else {
            throw new Error(`Invalid attribute = ${value}`)
        }
    }
}

export class CharacterUtils {
    static swapSkill(index: number, skill: ISkill) {
        CharacterSheet.update((c) => {
            c.skills[index] = skill;

            return c
        })
    }

    static removeBonusOfAttribute(attribute: EAttribute, name: string) {
        if (!Object.keys(get(CharacterSheet).attributes).includes(attribute)) {
            throw new Error("Try to get a non existing attribute in character")
        }

        CharacterSheet.update(c => {
            delete (c.attributes[attribute] as IBonus).bonus[name]
            return c
        })
    }

    static addBonusToAttribute(attribute: EAttribute, name: string, value: number) {
        if (!Object.keys(get(CharacterSheet).attributes).includes(attribute)) {
            throw new Error("Try to get a non existing attribute in character")
        }

        CharacterSheet.update(c => {
            (c.attributes[attribute] as IBonus).bonus[name] = value
            return c
        })
    }

    static getAttribute(attribute: EAttribute) {
        if (!Object.keys(get(CharacterSheet).attributes).includes(attribute)) {
            throw new Error("Try to get a non existing attribute in character")
        }

        return get(CharacterSheet).attributes[attribute]
    }

    static modifyAttribute(attribute: EAttribute, value: number) {
        if (!Object.keys(get(CharacterSheet).attributes).includes(attribute)) {
            throw new Error("Try to get a non existing attribute in character")
        }

        CharacterSheet.update(c => {
            if (attribute === EAttribute.hp)
                return c

            c.attributes[attribute].value = value
            return c
        })
    }

    static addItemToInventory(item: IItem | IWeapon) {
        if ("hit" in item)
            CharacterSheet.update(c => {
                c.inventory.weapons.push(item)
                return c
            })
        else
            CharacterSheet.update(c => {
                c.inventory.equipments.push(item)
                return c
            })
    }

    static removeItemToInventory(item: IItem | IWeapon) {
        if ("hit" in item)
            CharacterSheet.update(c => {
                const i = c.inventory.weapons.indexOf(item)
                c.inventory.weapons.splice(i, 1)
                return c
            })
        else
            CharacterSheet.update(c => {
                const i = c.inventory.equipments.indexOf(item)
                c.inventory.equipments.splice(i, 1)
                return c
            })
    }

    static serializedChar() {
        return JSON.stringify(get(CharacterSheet))
    }

    static saveToLocalStorage() {
        localStorage.setItem("character", this.serializedChar())
    }

    static async saveOnDb(dbClient: SupabaseClient) {
        const { data: cloud_save, error: err } = await dbClient
            .from("cloud_save")
            .select("json")
            .eq("user_id", (await dbClient.auth.getUser()).data.user?.id);
        const index = localStorage.getItem("index")
        const tempArr: ICharacter[] = [];
        const charToSave = get(CharacterSheet)

        if (err) {
            console.log(err);
            return;
        }
        if (cloud_save[0] == null) {
            tempArr.push(charToSave);

            await dbClient
                .from("cloud_save")
                .upsert([{ json: [JSON.stringify(tempArr)] }])
                .select();
            console.log(tempArr)
        } else {
            const charArr = JSON.parse(cloud_save[0].json) as ICharacter[];

            charArr[Number.parseInt(index!)] = charToSave;

            await dbClient
                .from("cloud_save")
                .upsert([{ json: [JSON.stringify(charArr)] }])
                .select();

            console.log(charArr)
        }
    }

    static loadCharFromLocalStorage() {
        const rawData = localStorage.getItem("character")

        if (rawData) {
            const char = JSON.parse(rawData) as ICharacter

            return char
        }
        else
            throw new Error("Character not found, or invalid")
    }

    static equipadedWeapons() {
        const arr = get(CharacterSheet)
            .inventory
            .weapons
            .filter(item => item.isEquipped === true)

        return arr
    }

    static equipadedItems() {
        const arr = get(CharacterSheet)
            .inventory
            .equipments
            .filter(item => item.isEquipped === true)

        return arr
    }
}
