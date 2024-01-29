import type { IHp } from "./IHp";

export interface ISkill {
    icon: string;
    name: string;
    description: string;
    cooldown: number;
    currentCooldown: number;
    hp?: IHp;
    range?: number;
    rangeArea?: number;
    duration?: number;
    attToModify?: { [id: string]: number; };
}
