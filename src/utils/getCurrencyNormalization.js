/**
 * @param {string} currency
 * @returns {[string, number]}
 */
export function getCurrencyNormalization(currency) {
	// TODO: cover all weird currencies
	return currency === 'GBX' ? ['GBP', 0.01] : [currency, 1];
}
