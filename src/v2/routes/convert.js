import { toUnicode, toAscii } from 'gurmukhi-utils'

/**
 * Conver
 * @param {string} type Convert to this type
 * @param {string} text Text to convert
 */
const convertText = ( type, text ) => {
  const convertedText = ( type === 'akhar' ) ? toAscii( text ) : toUnicode( text )
  return {
    input: text,
    result: convertedText,
    format: type,
  }
}

export default convertText
