/**
 * @param {string} property
 * @param {Object.<string, any>[]} array
 * @returns {Object.<string, Object[]>}
 */
export function groupBy(property, array) {
	return array.reduce((acc, obj) => {
		const key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
}
