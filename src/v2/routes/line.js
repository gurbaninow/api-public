import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams, getTranslation } from '../tools'
import translationSources from '../translationSources'

/**
 * Get Line from Line ID
 * @param {string} lineId The ID of the Line to query.
 * @async
 */
const getLine = async lineId => {
  const lineData = await Lines.query()
    .eager( 'shabad.[section.source, writer]' )
    .withTranslations( translationSources )
    .withTransliterations( [ 1, 4 ] )
    .where( 'lines.id', lineId )
    .then( ( [ line ] ) => line )

  const line = {
    line: {
      id: lineData.id,
      shabadid: lineData.shabadId,
      gurmukhi: {
        akhar: stripVishraams( lineData.gurmukhi ),
        unicode: toUnicode( stripVishraams( lineData.gurmukhi ) ),
      },
      larivaar: {
        akhar: textLarivaar( stripVishraams( lineData.gurmukhi ) ),
        unicode: textLarivaar( toUnicode( stripVishraams( lineData.gurmukhi ) ) ),
      },
      translation: {
        english: {
          default: getTranslation( lineData.translations, 1 ),
        },
        punjabi: {
          default: {
            akhar: toAscii( getTranslation( lineData.translations, 2 ) ),
            unicode: getTranslation( lineData.translations, 2 ),
          },
        },
        spanish: getTranslation( lineData.translations, 3 ),
      },
      transliteration: {
        english: {
          text: stripVishraams( lineData.transliterations.find( (
            ( { language: { id } } ) => id === 1 ) ).transliteration ),
          larivaar: textLarivaar( stripVishraams( lineData.transliterations.find( (
            ( { language: { id } } ) => id === 1 ) ).transliteration ) ),
        },
        devanagari: {
          text: stripVishraams( lineData.transliterations.find( (
            ( { language: { id } } ) => id === 4 ) ).transliteration ),
          larivaar: textLarivaar( stripVishraams( lineData.transliterations.find( (
            ( { language: { id } } ) => id === 4 ) ).transliteration ) ),
        },
      },
      source: {
        id: lineData.shabad.section.source.id,
        akhar: lineData.shabad.section.source.nameGurmukhi,
        unicode: toUnicode( lineData.shabad.section.source.nameGurmukhi ),
        english: lineData.shabad.section.source.nameEnglish,
        length: lineData.shabad.section.source.length,
        pageName: {
          akhar: lineData.shabad.section.source.pageNameGurmukhi,
          unicode: toUnicode( lineData.shabad.section.source.pageNameGurmukhi ),
          english: lineData.shabad.section.source.pageNameEnglish,
        },
      },
      writer: {
        id: lineData.shabad.writer.id,
        akhar: lineData.shabad.writer.nameGurmukhi,
        unicode: toUnicode( lineData.shabad.writer.nameGurmukhi ),
        english: lineData.shabad.writer.nameEnglish,
      },
      raag: {
        id: lineData.shabad.section.id,
        akhar: lineData.shabad.section.nameGurmukhi,
        unicode: toUnicode( lineData.shabad.section.nameGurmukhi ),
        english: lineData.shabad.section.nameEnglish,
        startang: lineData.shabad.section.startPage,
        endang: lineData.shabad.section.endPage,
        raagwithpage: `${lineData.shabad.section.nameEnglish} (${lineData.shabad.section.startPage}-${lineData.shabad.section.endPage})`,
      },
      pageno: lineData.sourcePage,
      lineno: lineData.sourceLine,
      firstletters: {
        akhar: lineData.firstLetters,
        unicode: toUnicode( lineData.firstLetters ),
      },
    },
  }

  return line
}

export default getLine
