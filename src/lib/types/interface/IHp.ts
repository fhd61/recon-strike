import type { IBonus } from "./IBonus";

export interface IHp extends IBonus{
    currentValue: number;
    maxValue: number;
}
