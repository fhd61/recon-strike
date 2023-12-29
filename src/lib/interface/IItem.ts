export interface IItem {
    icon: string;
    name: string;
    description: string;
    attToModify?: { [id: string]: number; };
    isEquipped?: boolean;
}
