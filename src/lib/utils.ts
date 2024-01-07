import { get } from "svelte/store";
import { CharacterSheet, EAttribute, type ICharacter } from "./store/character";
import type { IItem } from "./types/interface/IItem";
import type { IWeapon } from "./types/interface/IWeapon";
import type { IBonus } from "./types/interface/IBonus";
import { error } from "@sveltejs/kit";

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

    static serializedChar() {
        return JSON.stringify(get(CharacterSheet))
    }

    static saveToLocalStorage() {
        localStorage.setItem("character", this.serializedChar())
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
}