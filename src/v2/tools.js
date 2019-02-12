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

/**
 * Return translation from Language ID
 * @param {object} translations Translations Object from Shabad OS DB
 * @param {number} languageId Lanuage ID of Translation
 * @returns {string} Translation
 */
export const getTranslation = ( translations, languageId ) => {
  const { translation } = translations.find( ( { translationSource: {
    language: { id },
  } } ) => id === languageId ) || {}

  return translation || ''
}
