export const getSetup = async () => {
	return {
		csvColumns: {
			lang: 'en',
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
				11: 'Value',
				12: '', // value currency
				13: 'Exchange rate',
				14: 'Transaction and/or third',
				15: '', // transaction and/or third currency
				16: 'Total',
				17: '', // total currency
				18: 'Order ID',
			},
		},
		output: {
			lang: 'en',
			map: [
				{ title: 'Date', field: 'datetime' },
				{ title: 'Product', field: 'product' },
				{ title: 'ISIN', field: 'isin' },
				{ title: 'Exchange', field: 'exchangeReference' },
				{ title: 'Venue', field: 'venue' },
				{ title: 'Action', field: 'action' },
				{ title: 'Qty', field: 'quantity' },
				{ title: 'Price', field: `${price} ${priceCurrency}` },
				{ title: 'Local value', field: `${localValue} ${localValueCurrency}` },
				{ title: 'Value', field: `${value} ${valueCurrency}` },
				{ title: 'Exchange rate', field: 'exchangeRate' },
				{ title: 'Fees', field: `${fees} ${feesCurrency}` },
				{ title: 'Total', field: `${total} ${totalCurrency}` },
			],
		},
	};
};
