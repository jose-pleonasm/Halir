/**
 * @typedef {Object} Config
 * @property {string} fileEncoding
 * @property {string} lineSeparator
 * @property {string} columnSeparator
 * @property {string} uuidNamespace
 * @property {string} timezone
 * @property {string} dateFormat
 */

/**
 * @typedef {Object} Setup
 * @property {'degiro'} profile
 * @property {string} inputFile
 * @property {string} outputFile
 * @property {Config} config
 */

/**
 * @typedef {Object}  HSTONItem
 * @property {string} id UUID
 * @property {string} datetime Date as a string value in ISO format.
 * @property {string} product
 * @property {string} isin
 * @property {string} exchangeReference
 * @property {string} venue
 * @property {number} quantity
 * @property {number} price
 * @property {string} priceCurrency
 * @property {number} localValue
 * @property {string} localValueCurrency
 * @property {number} value
 * @property {string} valueCurrency
 * @property {number} exchangeRate
 * @property {number} fees
 * @property {string} feesCurrency
 * @property {number} total
 * @property {string} totalCurrency
 * @property {string} orderId
 */

/**
 * Halir Securities Transactions jsON
 * @typedef {HSTONItem[]}  HSTON
 */
