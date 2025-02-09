import { groupBy } from '../utils/groupBy.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';
import { add } from '../utils/math.js';
import { InvalidParamError } from '../error/InvalidParamError.js';
import { InvalidHstonError } from '../error/InvalidHstonError.js';

/**
 * @typedef {Object} Options
 * @property {number} numberScaleFactor
 */

/**
 * @param {Options} options
 * @param {HSTON} hston
 * @returns {Promise<HSOON>}
 */
export function makeOverview({ numberScaleFactor }, hston) {
	if (!basicValueCheck('number', numberScaleFactor) || isNaN(numberScaleFactor)) {
		throw new InvalidParamError('options.numberScaleFactor', { source: makeOverview.name, value: numberScaleFactor });
	}
	if (!basicValueCheck('object', hston)) {
		throw new InvalidHstonError('', { source: makeOverview.name, value: hston });
	}

	/** @type {Object.<string, HSTONItem[]>} */
	const grouped = groupBy('isin', hston);
	// TODO: pridat total sell value nebo tak neco
	const calculated = Object.keys(grouped).reduce((calculated, isin) => {
		const entries = grouped[isin];
		const { product, localValueCurrency, valueCurrency, feesCurrency, totalCurrency } = entries[0];
		return {
			...calculated,
			[isin]: entries.reduce(
				(data, entry) => ({
					...data,
					quantity: add(numberScaleFactor, data.quantity, entry.quantity),
					totalLocalValue: add(numberScaleFactor, data.totalLocalValue, -entry.localValue),
					totalValue: add(numberScaleFactor, data.totalValue, -entry.value),
					totalFees: add(numberScaleFactor, data.totalFees, -entry.fees),
					total: add(numberScaleFactor, data.total, -entry.total),
				}),
				{
					isin,
					product,
					quantity: 0,
					totalLocalValue: 0,
					totalLocalValueCurrency: localValueCurrency,
					totalValue: 0,
					totalValueCurrency: valueCurrency,
					totalFees: 0,
					totalFeesCurrency: feesCurrency,
					total: 0,
					totalCurrency: totalCurrency,
					// TODO: avaragePrice, avaragePriceCurrency, avarageExchangeRate
				},
			),
		};
	}, {});

	return Object.values(calculated);
}
