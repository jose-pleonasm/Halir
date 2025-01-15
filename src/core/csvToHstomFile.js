/**
 * @param {Setup} setup
 * @returns {Promise<void>}
 */
export const csvToHstonFile = async (setup) => {
	checkSetup(setup);
	const { profile, inputFile, outputFile, config } = setup;
	const { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat, fileEncoding } = config;

	const input = await fs.readFile(inputFile, { encoding: fileEncoding });
	if (!input) {
		throw new InvalidInputError(inputFile);
	}

	const module = await import(`../modules/${profile}/index.js`);
	const hston = await module.csvToHston(input, { lineSeparator, columnSeparator, uuidNamespace, timezone, dateFormat });

	return fs.writeFile(outputFile, JSON.stringify(hston));
};
