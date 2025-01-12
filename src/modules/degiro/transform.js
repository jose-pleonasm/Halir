import { v5 } from 'uuid';

const makeParser = ({ separator }) =>
	function parser(input) {
		return input.split(separator);
	};

function hasValues(line) {
	return line.filter((cells) => cells.length).length;
}

function getDateValue(line, { timezone, dateFormat }) {
	const date =
		dateFormat === 'DD-MM-YYYY'
			? (() => {
					const [day, month, year] = line[0].split('-');
					return `${year}-${month}-${day}`;
				})()
			: line[0];
	return `${date} ${line[1]} ${timezone}`; // TODO: detekci casove zony podle obdobi
}

function getNumberOrNull(value) {
	return value != null && value !== '' ? parseFloat(value) : null; // TODO: co delat s NaN?
}

function getAction(line) {
	const quantity = getNumberOrNull(line[6]);
	if (quantity === null) {
		return ''; // ?
	}
	if (isNaN(quantity)) {
		return '[ERROR]';
	}

	return quantity > 0 ? 'buy' : 'sell'; // TODO: lepsi detekci + pridat akce (jako "Split Adjustment")
}

function parse(input, options) {
	const { lineSeparator, columnSeparator } = options;
	const makeLines = makeParser({ separator: lineSeparator });
	const makeCells = makeParser({ separator: columnSeparator });
	const [_head, ...rawLines] = makeLines(input);
	const lines = rawLines.map(makeCells);
	return lines.filter(hasValues);
}

const makeTransformer = ({ uuidNamespace, timezone, dateFormat }) =>
	function transformer(line) {
		const id = v5(line.join(''), uuidNamespace);

		return {
			id,
			action: getAction(line),
			datetime: new Date(getDateValue(line, { timezone, dateFormat })).toISOString(),
			product: line[2],
			isin: line[3],
			exchangeReference: line[4],
			venue: line[5],
			quantity: getNumberOrNull(line[6]),
			price: getNumberOrNull(line[7]),
			priceCurrency: line[8],
			localValue: getNumberOrNull(line[9]),
			localValueCurrency: line[10],
			value: getNumberOrNull(line[11]),
			valueCurrency: line[12],
			exchangeRate: getNumberOrNull(line[13]),
			fees: getNumberOrNull(line[14]),
			feesCurrency: line[15],
			total: getNumberOrNull(line[16]),
			totalCurrency: line[17],
			orderId: line[18],
		};
	};

function makeNormalizedEntries(lines, options) {
	const transform = makeTransformer(options);
	return lines.map(transform);
}

export const transform = async (input, options) => {
	const lines = parse(input, options);
	return makeNormalizedEntries(lines, options);
};
