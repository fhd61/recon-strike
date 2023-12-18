import { writable } from "svelte/store";
import type { IDossier } from "../interface/IDossier";
import type { IAttribute } from "../interface/IBaseAttribute";
import type { ISkill } from "../interface/ISkill";
import type { IItem } from "../interface/IItem";
import type { IHp } from "../interface/IHp";

export interface ICharacter {
  dossier: IDossier,
  attributes: {
    "agi": IAttribute,
    "int": IAttribute,
    "for": IAttribute,
    "vig": IAttribute,
    "def": IAttribute,
    "speed": IAttribute,
    "ac": IAttribute,
    "hp": IHp,
  },
  skills: Array<ISkill>,
  inventory: Array<IItem>
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
    hp: { currentValue: 100, maxValue: 100, bonus: {} },
    agi: { id: 'agi', name: 'Agility', shortName: 'agi', value: 1, bonus: {} },
    int: { id: 'int', name: 'Intelligence', shortName: 'int', value: 1, bonus: {} },
    for: { id: 'for', name: 'Force', shortName: 'for', value: 1, bonus: {} },
    vig: { id: 'agi', name: 'Vigor', shortName: 'vig', value: 1, bonus: {} },
    def: { id: 'def', name: 'Defense', shortName: 'def', value: 1, bonus: {} },
    speed: { id: 'speed', name: 'Speed', shortName: 'speed', value: 1, bonus: {} },
    ac: { id: 'ac', name: 'ac', shortName: 'ac', value: 1, bonus: {} }
  },
  skills: [
  ],
  inventory: [
  ],
};

export const CharacterSheet = writable<ICharacter>(initialCharacterData)
