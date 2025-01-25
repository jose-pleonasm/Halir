/**
 * @private
 * @typedef {string[]} Row
 */

/**
 * @typedef {Object} Config
 * @property {string} uuidNamespace
 * @property {number} numberScaleFactor
 * @property {string} lineSeparator
 * @property {string} columnSeparator
 * @property {string} fileEncoding
 * @property {string} columns
 * @property {string} locales
 * @property {string} timezone
 * @property {string} dateFormat
 * @property {string} timeFormat
 * @property {string} outputLocales
 * @property {string?} outputColumns
 * @property {string?} outputTimezone
 * @property {string?} outputColumnSeparator
 */

/**
 * @typedef {'degiro'} Profile
 */

/**
 * @typedef {Object}  HSTONItem
 * @property {string} id UUID
 * @property {string} action
 * @property {string} datetime Date as a string value in ISO format.
 * @property {string} product
 * @property {string} isin
 * @property {string} exchangeReference
 * @property {string} venue
 * @property {number | null} quantity
 * @property {number | null} price
 * @property {string} priceCurrency
 * @property {number | null} localValue
 * @property {string} localValueCurrency
 * @property {number | null} value
 * @property {string} valueCurrency
 * @property {number | null} exchangeRate
 * @property {number | null} fees
 * @property {string} feesCurrency
 * @property {number | null} total
 * @property {string} totalCurrency
 * @property {string} orderId
 */

/**
 * Halir Securities Transactions jsON
 * @typedef {HSTONItem[]}  HSTON
 */

/**
 * @typedef {Object}  HSOONItem
 * @property {string} product
 * @property {string} isin
 * @property {number} quantity
 * @property {number} avaragePrice
 * @property {string} avaragePriceCurrency
 * @property {number} totalLocalValue
 * @property {string} totalLocalValueCurrency
 * @property {number} totalValue
 * @property {string} totalValueCurrency
 * @property {number} avarageExchangeRate
 * @property {number} totalFees
 * @property {string} totalFeesCurrency
 * @property {number} total
 * @property {string} totalCurrency
 */

/**
 * Halir Securities Overview jsON
 * @typedef {HSOONItem[]}  HSOON
 */
