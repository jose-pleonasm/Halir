/**
 * @param {Object} options
 * @param {string} inputDate
 * @param {string?} inputTime
 * @returns {string}
 */
export function getDateValue({ timezone, dateFormat }, inputDate, inputTime) {
	const date =
		dateFormat === 'DD-MM-YYYY'
			? (() => {
					const [day, month, year] = inputDate.split('-');
					return `${year}-${month}-${day}`;
				})()
			: inputDate;
	return `${date} ${inputTime} ${timezone}`; // TODO: detekci casove zony podle obdobi
}
