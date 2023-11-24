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

export let Character = writable<ICharacter>()
