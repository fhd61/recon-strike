import { StringUtils } from "./utils"

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
	const { sides, modifierSum, rollTimes } = StringUtils.parseDiceNotation(rollText)

	return rollDice("👀", sides, [modifierSum], rollTimes);
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
