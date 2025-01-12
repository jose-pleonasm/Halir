export const getConfig = async () => {
	const baseConfig = {
		lang: process.env.LANG || 'en',
		dateFormat: process.env.DATE_FORMAT || 'DD-MM-YYYY',
		timezone: process.env.TIMEZONE || 'UTC+01:00',
		lineSeparator: process.env.DELIMITER || '\n',
		columnSeparator: process.env.SEPARATOR || ',',
		fileEncoding: process.env.FILE_ENCODING || 'utf8',
		uuidNamespace: process.env.UUID_NAMESPACE || 'd4cc5023-65d2-42d6-ad9a-164871762d68',
	};

	return baseConfig;
};
