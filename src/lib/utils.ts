import { get } from "svelte/store";
import { CharacterSheet } from "./store/character";
import type { IItem } from "./types/interface/IItem";
import type { IWeapon } from "./types/interface/IWeapon";

export class MathUtils {
    static clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
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

export class CharacterUtils {
    static modifyAttribute(attribute:string, value:number) {
        if(!Object.keys(get(CharacterSheet).attributes).includes(attribute)){
            throw new Error("Try to get a non existing attribute in character")
        }

        CharacterSheet.update(c => {
            //@ts-ignore
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
}