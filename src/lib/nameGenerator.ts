export default async function nameGenerator() {
    var a = await fetch('https://namey.muffinlabs.com/name.json?count=1&with_surname=true')
    var names = await a.json();

    return names[0]
}