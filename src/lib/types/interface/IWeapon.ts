import type { IEquitable } from "./IEquitable"
import type { IItem } from "./IItem"

export interface IWeapon extends IEquitable {
    icon?: string
    description?: string
    name: string
    hit: string
    modifier: string
    damage: string
    damageType?: string
    range: number
    critValue: number
    critMut: number
    bonus: { [id: string]: {[attToModify:string]: number} }
    isMelee?: boolean
    mods?: IItem[]
    talents?: IItem[]
}
