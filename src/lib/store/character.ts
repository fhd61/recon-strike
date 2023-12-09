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

const initialCharacterData: ICharacter = {
  dossier: {
    name: 'Character Name',
    callSign: 'CS123',
    level: 1,
    portrait: '',
    bio: 'Character biography...',
    notes: 'Additional notes...',
  },
  attributes: {
      hp: { currentValue: 100, maxValue: 100, bonus: {} },
      agi: { id: 'agi', name: 'Agility', shortName: 'Agi', value: 10, bonus: {} },
      int: { id: 'int', name: 'Intelligence', shortName: 'Int', value: 8, bonus: {} },
      for: { id: 'for', name: 'Force', shortName: 'for', value: 3, bonus: {} },
      vig: { id: 'agi', name: 'Vigor', shortName: 'vig', value: 5, bonus: {} },
      def: { id: 'def', name: 'Defense', shortName: 'Agi', value: 20, bonus: {} },
      speed: { id: 'speed', name: 'Speed', shortName: 'speed', value: 5, bonus: {} },
      ac: { id: 'ac', name: 'ac', shortName: 'ac', value: 10, bonus: {} }
  },
  skills: [
  ],
  inventory: [
  ],
};

export const CharacterSheet = writable<ICharacter>(initialCharacterData)
