export const getSetup = async () => {
	return {
		columns: {
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
	};
};
