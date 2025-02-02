export function makeTableData({ columns, transformers, titleMap }, entries) {
	const rows = entries.map((entry) => {
		return columns.map((column) => {
			if (transformers?.[column] != null) {
				return typeof transformers[column] === 'function'
					? transformers[column](entry[column], entry)
					: transformers[column][entry[column]];
			}

			return entry[column];
		});
	});

	return [columns.map((column) => titleMap?.[column] || column), ...rows];
}
