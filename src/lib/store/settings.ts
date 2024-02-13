import { writable } from "svelte/store";

export const playerSettings = writable({ timeToAutoSave: 10000 })