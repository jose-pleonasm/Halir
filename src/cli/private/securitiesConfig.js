const SecurityMetadata = {
	US67066G1040: {
		symbol: { default: 'NVDA' },
		exchange: { default: 'NASDAQ' },
	},
	US0079031078: {
		symbol: { default: 'AMD' },
		exchange: { default: 'NASDAQ' },
	},
	US4581401001: {
		symbol: { default: 'INTC' },
		exchange: { default: 'NASDAQ' },
	},
	US7475251036: {
		symbol: { default: 'QCOM' },
		exchange: { default: 'NASDAQ' },
	},
	US6821891057: {
		symbol: { default: 'ON' },
		exchange: { default: 'NASDAQ' },
	},
	GG00BBHX2H91: {
		symbol: { default: 'TRIG' },
		exchange: { default: 'LON' },
	},
	IE00B1XNHC34: {
		symbol: { default: 'INRG' },
		exchange: { default: 'LON' },
	},
	GB0002374006: {
		symbol: { default: 'DGE' },
		exchange: { default: 'LON' },
	},
	FR0000120693: {
		symbol: { default: 'RI' },
		exchange: { default: 'EPA' },
	},
	FR0013447729: {
		symbol: { default: 'VRLA' },
		exchange: { default: 'EPA' },
	},
	US88579Y1010: {
		symbol: { default: 'MMM' },
		exchange: { default: 'NYSE' },
	},
	US83444M1018: {
		symbol: { default: 'SOLV' },
		exchange: { default: 'NYSE' },
	},
};

export const Ticker = Object.entries(SecurityMetadata).reduce(
	(ticker, [isin, metadata]) => ({ ...ticker, [isin]: { default: `${metadata.exchange.default}:${metadata.symbol.default}` } }),
	{},
);
