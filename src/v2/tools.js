/**
 * Response template for error
 * @param {object} req Express request obj
 * @param {object} error JavaScript Error Constructor
 * @returns {object} Formatted Error Data
 */
export const errorResponse = ( { path, method, params, query }, { message } ) => ( {
  error: true,
  request: { path, method, params, query },
  message,
} )

/**
 * Replaces spaces with zero-width space for Larivaar
 * @param {string} text Pad-Shed text
 * @returns {string} Larivaar Text
 */
export const textLarivaar = text => text.replace( /\s/ug, '\u200B' )

/**
 * Removes vishraams characters from string
 * @param {string} text Text with Vishraams
 * @returns {string} Text without Vishraams
 */
export const stripVishraams = text => text.replace( /[;,.]/ug, '' )
