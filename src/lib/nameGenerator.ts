export default async function nameGenerator() {
    const a = await fetch('https://namey.muffinlabs.com/name.json?count=1&with_surname=true')
    const names = await a.json();

    return names[0]
}