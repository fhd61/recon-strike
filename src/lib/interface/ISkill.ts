
export interface ISkill {
    icon: string;
    name: string;
    description: string;
    cooldown: number;
    hp?: number;
    range?: number;
    rangeArea?: number;
    attToModify: { [id: string]: number; };
}
