/**
 * @private
 * @typedef {string[]} Row
 */

/**
 * @private
 * @typedef {Object.<string, Object.<string, any>>} TransformerMap
 */

/**
 * @private
 * @typedef {Object.<string, Function | TransformerMap>} Transformers
 */

/**
 * @private
 * @typedef {Object.<'default', string>} Ticker
 */

// Options (inputs, settings etc.)

/**
 * @typedef {Object} CustomErrorOptions
 * @property {(Error | string)?} cause
 * @property {string?} source
 * @property {string?} value CustomTypeError
 */

/**
 * @typedef {Object} Library
 * @property {Function} uuidV5
 * @property {Function} makeOdsFiles
 * @property {Function} makeZip
 */

/**
 * @typedef {Object} Config
 * @property {string} uuidNamespace
 * @property {number} numberScaleFactor
 * @property {string} lineSeparator
 * @property {string} columnSeparator
 * @property {Object.<string, Ticker>} tickerMap
 * @property {string} fileEncoding
 * @property {string} columns
 * @property {string} overviewColumns
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

// Formats (outputs)

/**
 * @typedef {Object}  HSTONItem
 * @property {string} id UUID
 * @property {string} action
 * @property {string} note
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
 * @property {string} isin
 * @property {string} product
 * @property {number} quantity
 * @property {number} totalLocalValue
 * @property {string} totalLocalValueCurrency
 * @property {number} totalValue
 * @property {string} totalValueCurrency
 * @property {number} avarageExchangeRate
 * @property {number} totalFees
 * @property {string} totalFeesCurrency
 * @property {number} totalTotal
 * @property {string} totalTotalCurrency
 * @property {number} totalBuy
 * @property {number} totalSell
 */

/**
 * Halir Securities Overview jsON
 * @typedef {HSOONItem[]}  HSOON
 */
