export interface IAttribute {
    id:string,
    name:string,
    shortName:string,
    value: number;
    bonus: { [id: string]: number; };
}