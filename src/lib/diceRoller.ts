export interface IRollResult {
    name: string
    rolls: number[]
    bonus: number[]
    rollsTotal: number
    bonusTotal: number
    total: number
}

export function rollFromString(rollText: string): IRollResult | void {
    const regex = /^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i;
    const match = rollText.match(regex);

    if (!match) {
        throw new Error("Invalid dice notation format");
        return
    }

    const [, numberOfDice, diceType, modifiers] = match;
    const numDice = numberOfDice ? parseInt(numberOfDice) : 1;
    const sides = parseInt(diceType);

    const parsedModifiers = modifiers ? modifiers.match(/[+-]?\s*\d+/g) || [] : [];
    const modifierValues = parsedModifiers.map(modifier => parseInt(modifier.replace(/\s+/g, "")));

    const modifierSum = modifierValues.reduce((total, modifier) => total + modifier, 0);

    return rollDice("👀",sides, numDice, [modifierSum]);
}

export function rollDice(name:string,diceType: number, rollTimes: number = 1, bonus: number[] = []): IRollResult {
    console.log({rollTimes, bonus, diceType})
    
    let rolls = new Array<number>
    let bonusTotal = bonus.reduce((acc, cur) => acc + cur)
    let rollsTotal = 0
    let summery = ""

    for (let i = 0; i < rollTimes; i++) {
        rolls.push(Math.ceil(Math.random() * diceType) + 1)
    }
    rollsTotal = rolls.reduce((acc, cur) => acc + cur)

    return {
        name,
        rolls,
        bonus,
        rollsTotal,
        bonusTotal,
        total: rollsTotal + bonusTotal,
    }
}