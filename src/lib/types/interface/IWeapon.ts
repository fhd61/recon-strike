import type { IEquitable } from "./IEquitable"

export interface IWeapon extends IEquitable{
    name: string
    hit: string
    modifier: string
    damage: string
    damageType?: string
    range: number
    critValue: number
    critMult: number
}
