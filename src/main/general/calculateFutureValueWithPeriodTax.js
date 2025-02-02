/**
 * @param {number} periodInterestRate - e.g. 0.01 / 12
 * @param {number} numberOfPeriods - e.g. 6 * 12
 * @param {number} periodDeposit - e.g. 1000
 * @param {number=0} startingValue - e.g. 100000
 * @param {boolean=true} beginning - e.g. true
 * @param {number=0} periodTaxRate - e.g. 0.15
 * @returns
 */
export function calculateFutureValueWithPeriodTax(
	periodInterestRate,
	numberOfPeriods,
	periodDeposit,
	startingValue = 0,
	// TODO: dodelat beginning false
	beginning = true,
	periodTaxRate = 0,
) {
	// TODO: zkontrolovat vstupy
	let futureValue = startingValue;

	for (let period = 1; period <= numberOfPeriods; period++) {
		futureValue += periodDeposit;

		const interest = futureValue * periodInterestRate;

		const tax = interest * periodTaxRate;
		futureValue += interest - tax;
	}

	return futureValue;
}
