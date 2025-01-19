import { groupBy } from '../utils/groupBy.js';
import { basicValueCheck } from '../utils/basicValueCheck.js';
import { InvalidHstonError } from '../error/InvalidHstonError.js';

/**
 * @param {HSTON} hston
 * @returns {Promise<HSOON>}
 */
export function makeOverview(hston) {
	if (!basicValueCheck('object', hston)) {
		throw new InvalidHstonError();
	}

	const grouped = groupBy('isin', hston);
	const calculated = Object.keys(grouped).reduce((calculated, isin) => {
		const entries = grouped[isin];
		const { product } = entries[0];
		return {
			...calculated,
			[isin]: entries.reduce(
				(data, entry) => ({
					...data,
					quantity: data.quantity + entry.quantity,
					totalLocalValue: data.totalLocalValue + entry.localValue,
					totalValue: data.totalValue + entry.value,
					totalFees: data.totalFees + entry.fees,
					total: data.total + entry.total,
				}),
				{
					isin,
					product,
					quantity: 0,
					totalLocalValue: 0,
					totalValue: 0,
					totalFees: 0,
					total: 0,
				},
			),
		};
	}, {});

	return Object.values(calculated);
}
