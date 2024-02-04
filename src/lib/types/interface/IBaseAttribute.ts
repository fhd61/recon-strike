import type { IBonus } from "./IBonus";

export interface IAttribute extends IBonus {
    id:string,
    name:string,
    shortName:string,
    value: number;
    use?:"agi" | "int" | "for"  
}