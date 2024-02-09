import { MathUtils, StringUtils } from "./utils"

export interface IRollResult {
	name: string
	rolls: number[]
	bonus: number[]
	rollsTotal: number
	bonusTotal: number
	total: number
	summary: string
}

export function rollFromString(rollText: string): IRollResult | void {
	const { sides, modifierSum, rollTimes } = StringUtils.parseDiceNotation(rollText)

	return rollDice("👀", sides, [modifierSum], rollTimes);
}

export function rollDice(name: string, diceSides: number, bonus: number[] = [], rollTimes: number = 1,): IRollResult {
	const rolls = Array.from({ length: rollTimes }, () => MathUtils.randomNumber(diceSides));
	
	const bonusTotal = bonus.reduce((acc, cur) => acc + cur, 0);
	const rollsTotal = rolls.reduce((acc, cur) => acc + cur, 0);

	const total = rollsTotal + bonusTotal;
	const bonusPart = bonus.length > 0 ? ` + [${bonus.toString()}]` : '';


	return {
		name,
		rolls,
		bonus,
		rollsTotal,
		bonusTotal,
		total,
		summary: `[${rolls.toString()}]${bonusPart} = ${total}`
	};
}