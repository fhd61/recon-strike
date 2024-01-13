import type { IEquitable } from "./IEquitable"

export interface IWeapon extends IEquitable{
    icon?: string
    description?: string
    name: string
    hit: string
    modifier: string
    damage: string
    damageType?: string
    range: number
    critValue: number
    critMult: number
}
