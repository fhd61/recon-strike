import { writable } from "svelte/store";
import type { IDossier } from "../types/interface/IDossier";
import type { IAttribute } from "../types/interface/IBaseAttribute";
import type { ISkill } from "../types/interface/ISkill";
import type { IItem } from "../types/interface/IItem";
import type { IHp } from "../types/interface/IHp";
import type { IWeapon } from "$lib/types/interface/IWeapon";

export interface ICharacter {
  dossier: IDossier,
  attributes: {
    "agi": IAttribute,
    "int": IAttribute,
    "for": IAttribute,
    "vig": IAttribute,
    "def": IAttribute,
    "speed": IAttribute,
    "ga": IAttribute,
    "hp": IHp,
  },
  skills: ISkill[],
  inventory: { equipments: IItem[], weapons: IWeapon[] }
  talents: IItem[]
}

export enum EAttribute {
    agi = "agi",
    int = "int",
    for = "for",
    vig = "vig",
    def = "def",
    speed = "speed",
    ga = "ga",
    hp = "hp",
    cdr = "cdr"
}

export const initialCharacterData: ICharacter = {
  dossier: {
    name: '',
    callSign: '',
    level: 1,
    portrait: '',
    bio: '',
    notes: '',
  },
  attributes: {
    hp: { currentValue: 1, maxValue: 0, bonus: {} },
    agi: { id: 'agi', name: 'Agility', shortName: 'agi', value: 1, bonus: {} },
    int: { id: 'int', name: 'Intelligence', shortName: 'int', value: 1, bonus: {} },
    for: { id: 'for', name: 'Force', shortName: 'for', value: 1, bonus: {} },
    vig: { id: 'agi', name: 'Vigor', shortName: 'vig', value: 1, bonus: {} },
    def: { id: 'def', name: 'Defense', shortName: 'def', value: 0, bonus: {} },
    speed: { id: 'speed', name: 'Speed', shortName: 'speed', value: 9, bonus: {} },
    ga: { id: 'ac', name: 'ac', shortName: 'ac', value: 0, bonus: {}, use:"agi" }
  },
  skills: [],
  inventory: { equipments: [], weapons: [] },
  talents: []
};

export const CharacterSheet = writable<ICharacter>(initialCharacterData)
