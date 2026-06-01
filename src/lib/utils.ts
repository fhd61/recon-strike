import { get } from "svelte/store";
import { CharacterSheet, EAttribute, type ICharacter } from "./store/character";
import type { IItem } from "./types/interface/IItem";
import type { IWeapon } from "./types/interface/IWeapon";
import type { IBonus } from "./types/interface/IBonus";
import type { ISkill } from "./types/interface/ISkill";
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
            if (talents[i].attToModify === undefined)
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
        const char = get(CharacterSheet);
        return JSON.stringify(char);
    }

    static saveToLocalStorage() {
        const char = CharacterUtils.serializedChar();
        localStorage.setItem("character", char);
    }

    static addTalentToChar(talent: IItem) {
        CharacterSheet.update((c) => {
            c.talents.push(talent);
            return c;
        });
    }

    static removeTalentToChar(talent: IItem) {
        CharacterSheet.update((c) => {
            const index = c.talents.indexOf(talent)
            c.talents.splice(index, 1)
            return c;
        });
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

    static equipItem(item: IItem) {
        if (item !== undefined) {
            for (const key in item.attToModify) {
                const attName = EAttributeUtils.stringToAttribute(key)
                this.addBonusToAttribute(attName, item.name, item.attToModify[key])
            }
        }


        item.isEquipped = true;
    }

    static unEquipItem(item: IItem) {
        if (item !== undefined) {
            for (const key in item.attToModify) {
                const attName = EAttributeUtils.stringToAttribute(key)
                this.removeBonusOfAttribute(attName, item.name)
            }
        }


        item.isEquipped = true;
    }

    static equippedWeapons() {
        const arr = get(CharacterSheet)
            .inventory
            .weapons
            .filter(item => item.isEquipped === true)

        return arr
    }

    static equippedItems() {
        const arr = get(CharacterSheet)
            .inventory
            .equipments
            .filter(item => item.isEquipped === true)

        return arr
    }

    static exportCharToFile(char?: ICharacter) {
        const character = char || get(CharacterSheet);
        const name = character.dossier.name || "character";
        const blob = new Blob([JSON.stringify(character, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    static importCharFromFile(file: File): Promise<ICharacter> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const char = JSON.parse(e.target?.result as string) as ICharacter;
                    resolve(char);
                } catch {
                    reject(new Error("Arquivo de personagem inválido"));
                }
            };
            reader.onerror = () => reject(new Error("Falha ao ler o arquivo"));
            reader.readAsText(file);
        });
    }

    static getLocalCharacters(): ICharacter[] {
        try {
            const raw = localStorage.getItem("characters");
            if (raw) return JSON.parse(raw) as ICharacter[];
        } catch { /* empty */ }
        return [];
    }

    static saveLocalCharacters(arr: ICharacter[]) {
        localStorage.setItem("characters", JSON.stringify(arr));
    }

    static deleteLocalCharacter(index: number) {
        const arr = this.getLocalCharacters();
        if (index >= 0 && index < arr.length) {
            arr.splice(index, 1);
            this.saveLocalCharacters(arr);
        }
    }
}
