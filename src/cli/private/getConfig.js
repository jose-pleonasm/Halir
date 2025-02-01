/**
 * @returns {Config}
 */
export const getConfig = () => {
	return {
		// general
		uuidNamespace: process.env.UUID_NAMESPACE || 'd4cc5023-65d2-42d6-ad9a-164871762d68',
		numberScaleFactor: process.env.NUMBER_SCALE_FACTOR ? parseInt(process.env.NUMBER_SCALE_FACTOR, 10) : 10000,
		lineSeparator: process.env.DELIMITER || '\n',
		columnSeparator: process.env.SEPARATOR || ',',

		// input
		fileEncoding: process.env.FILE_ENCODING || 'utf8',
		columns:
			process.env.COLUMNS ||
			'date,time,product,isin,exchangeReference,venue,quantity,price,priceCurrency,localValue,localValueCurrency,value,valueCurrency,exchangeRate,fees,feesCurrency,total,totalCurrency,orderId', // TODO: nebere se v potaz (na vstupu)
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
		locales: process.env.LOCALES || 'en',
		timezone: process.env.TIMEZONE || 'UTC+01:00',
		// https://docs.oracle.com/cd/E19455-01/806-0169/overview-7/index.html
		dateFormat: process.env.DATE_FORMAT || 'DD-MM-YYYY',
		// https://docs.oracle.com/cd/E41183_01/DR/Time_Formats.html
		timeFormat: process.env.TIME_FORMAT || 'HH:MM',

		// output
		outputColumns: process.env.OUTPUT_COLUMNS,
		outputLocales: process.env.OUTPUT_LOCALES || 'cs-CZ',
		outputTimezone: process.env.OUTPUT_TIMEZONE,
		outputColumnSeparator: process.env.OUTPUT_SEPARATOR || '\t',
		// outputDateFormat: process.env.OUTPUT_DATE_FORMAT,
		// outputTimeFormat: process.env.OUTPUT_TIME_FORMAT,
	};
};
