export interface ISkill {
    icon: string;
    name: string;
    description: string;
    cooldown: number;
    currentCooldown: number;
    hp?: number;
    range?: number;
    rangeArea?: number;
    duration?: number;
    attToModify?: { [id: string]: number; };
}
