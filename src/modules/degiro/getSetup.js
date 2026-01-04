export const getSetup = async () => {
	return {
		csvColumns: {
			lang: 'en',
			/**
			 * @see Config.columns
			 */
			labels: {
				0: 'Date',
				1: 'Time',
				2: 'Product',
				3: 'ISIN',
				4: 'Reference',
				5: 'Venue',
				6: 'Quantity',
				7: 'Price',
				8: '', // price currency
				9: 'Local value',
				10: '', // local value currency
				11: 'Value', // EUR
				12: 'Exchange rate',
				13: 'AutoFX fee',
				14: 'Transaction and/or third party fees', // EUR
				15: 'Total', // EUR
				16: 'Order ID',
			},
		},
		output: {
			lang: 'en',
			/**
			 * for field value @see Config.columns
			 */
			map: [
				{ title: 'ID', field: 'id' },
				{ title: 'Date', field: 'datetime' },
				{ title: 'Product', field: 'product' },
				{ title: 'ISIN', field: 'isin' },
				{ title: 'Exchange', field: 'referenceExchange' },
				{ title: 'Venue', field: 'venue' },
				{ title: 'Action', field: 'action' },
				{ title: 'Qty', field: 'quantity' },
				{ title: 'Price', field: `${price} ${priceCurrency}` },
				{ title: 'Local value', field: `${localValue} ${localValueCurrency}` },
				{ title: 'Value', field: `${value} ${valueCurrency}` },
				{ title: 'Exchange rate', field: 'exchangeRate' },
				{ title: 'Fees', field: `${fees} ${feesCurrency}` },
				{ title: 'Total', field: `${total} ${totalCurrency}` },
				{ title: 'Order ID', field: 'orderId' },
			],
		},
	};
};
