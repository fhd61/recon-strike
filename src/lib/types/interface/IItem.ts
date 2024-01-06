import type { IEquitable } from "./IEquitable";

export interface IItem extends IEquitable{
    icon?: string;
    name: string;
    description: string;
    attToModify?: { [id: string]: number; };
}
