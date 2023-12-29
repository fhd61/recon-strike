import type { IItem } from '$lib/interface/IItem.js';

export async function load({ fetch }) {
    async function getData(url: string) {
        let data:IItem[];
        let fetchRes = await fetch(url)

        data = await fetchRes.json()

        return data
    }

    let ptalents = await getData("api/ptalents");


    return {
        defaults: {
            charTalents: ptalents
        }
    }
}