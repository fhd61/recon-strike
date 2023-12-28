export interface IRollResult {
	name: string
	rolls: number[]
	bonus: number[]
	rollsTotal: number
	bonusTotal: number
	total: number
	summery: string
}

export function rollFromString(rollText: string): IRollResult | void {
	const regex = /^(\d*)?d(\d+)((\s*[+-]\s*\d+\s*)+)?$/i;
	const match = rollText.match(regex);

	if (!match) {
		throw new Error("Invalid dice notation format");
	}

	const [, numberOfDice, diceType, modifiers] = match;
	const numDice = numberOfDice ? parseInt(numberOfDice) : 1;
	const sides = parseInt(diceType);

	const parsedModifiers = modifiers ? modifiers.match(/[+-]?\s*\d+/g) || [] : [];
	const modifierValues = parsedModifiers.map(modifier => parseInt(modifier.replace(/\s+/g, "")));

	const modifierSum = modifierValues.reduce((total, modifier) => total + modifier, 0);

	return rollDice("👀", sides, [modifierSum], numDice,);
}

export function rollDice(name: string, diceSides: number, bonus: number[] = [], rollTimes: number = 1,): IRollResult {
	let rolls = new Array<number>
	let bonusTotal = 0
	let rollsTotal = 0
	let total = 0

	if (bonus.length != 0)
		bonusTotal = bonus.reduce((acc, cur) => acc + cur)

	for (let i = 0; i < rollTimes; i++) {
		rolls.push(Math.ceil(Math.random() * diceSides) + 1)
	}

	if (rolls.length > 1)
		rollsTotal = rolls.reduce((acc, cur) => acc + cur)
	else
		rollsTotal = rolls[0]

	total = rollsTotal + bonusTotal

	return {
		name,
		rolls,
		bonus,
		rollsTotal,
		bonusTotal,
		total,
		summery: `[${rolls.toString()}] + [${bonus.toString()}] = ${total}`
	}
}
