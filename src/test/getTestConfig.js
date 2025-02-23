import { tickerMap } from '../cli/private/securitiesConfig.js'; // TODO

export const getTestConfig = () => {
	return {
		// general
		uuidNamespace: '8b558875-4377-477b-8d81-9b66ca9701b3',
		numberScaleFactor: 10000,
		lineSeparator: '\n',
		columnSeparator: ',',
		tickerMap: tickerMap,

		// input
		fileEncoding: 'utf8',
		columns:
			'date,time,product,isin,exchangeReference,venue,quantity,price,priceCurrency,localValue,localValueCurrency,value,valueCurrency,exchangeRate,fees,feesCurrency,totalTotal,totalTotalCurrency,orderId', // TODO: nebere se v potaz (na vstupu)
		overviewColumns:
			'isin,product,quantity,totalLocalValue,totalLocalValueCurrency,totalValue,totalValueCurrency,totalFees,totalFeesCurrency,totalTotal,totalTotalCurrency',
		locales: 'en',
		timezone: 'UTC+01:00',
		dateFormat: 'DD-MM-YYYY',
		timeFormat: 'HH:MM',

		// output
		outputColumns: undefined,
		outputLocales: 'cs-CZ',
		outputTimezone: undefined,
		outputColumnSeparator: '\t',
	};
};
