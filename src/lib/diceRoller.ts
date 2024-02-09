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

export interface IAttackResult {
  isCriticalHit: boolean;
  hitRoll: number;
  damageRolls: number[];
  totalDamage: number;
  summary: string;
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

export function rollForAttackAndDamage(
  hitDiceSides: number,
  damageDiceSides: number,
  criticalHitValue: number,
  criticalMultiplier: number = 2, // Default multiplier for critical hits
  rollTimes: number = 1 // Number of times to roll damage dice
): IAttackResult {
  // Roll for hit
  const hitRoll = Math.ceil(Math.random() * hitDiceSides);
  const isCriticalHit = hitRoll === criticalHitValue;

  // Roll for damage
  const damageRolls = Array.from({ length: rollTimes }, () => Math.ceil(Math.random() * damageDiceSides));
  const totalDamage = damageRolls.reduce((acc, roll) => acc + roll, 0) * (isCriticalHit ? criticalMultiplier : 1);

  // Construct summary
  const summary = `Hit Roll: ${hitRoll}${isCriticalHit ? ' (Critical!)' : ''}, Damage Rolls: [${damageRolls.toString()}], Total Damage: ${totalDamage}`;

  return {
    isCriticalHit,
    hitRoll,
    damageRolls,
    totalDamage,
    summary,
  };
}