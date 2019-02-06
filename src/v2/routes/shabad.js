import { Shabads } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import translationSources from '../translationSources'

/**
 * Get Shabad from Shabad id
 * @param {number} shabadId The ID of the Shabad to query.
 */
const getShabad = shabadId => Shabads.query()
  .where( 'shabads.id', shabadId )
  .eager( '[writer, section, source, lines]' )
  .withTranslations( translationSources )
  .withTransliterations( [ 1, 4 ] )
  .then( ( [ shabad ] ) => shabad )
  .then( shabad => {
    const shabadLines = {
      shabadinfo: {
        shabadid: shabad.id,
        pageno: shabad.lines[ 0 ].sourcePage,
        source: {
          id: shabad.source.id,
          akhar: shabad.source.nameGurmukhi,
          unicode: toUnicode( shabad.source.nameGurmukhi ),
          english: shabad.source.nameEnglish,
          length: shabad.source.length,
          pageName: {
            akhar: shabad.source.pageNameGurmukhi,
            unicode: toUnicode( shabad.source.pageNameGurmukhi ),
            english: shabad.source.pageNameEnglish,
          },
        },
        writer: {
          id: shabad.writer.id,
          akhar: shabad.writer.nameGurmukhi,
          unicode: toUnicode( shabad.writer.nameGurmukhi ),
          english: shabad.writer.nameEnglish,
        },
        raag: {
          id: shabad.section.id,
          akhar: shabad.section.nameGurmukhi,
          unicode: toUnicode( shabad.section.nameGurmukhi ),
          english: shabad.section.nameEnglish,
          startang: shabad.section.startPage,
          endang: shabad.section.endPage,
          raagwithpage: `${shabad.section.nameEnglish} (${shabad.section.startPage}-${shabad.section.endPage})`,
        },
        count: shabad.lines.length,
      },
      shabad: [],
    }
    shabad.lines.forEach( ( line, index ) => {
      shabadLines.shabad.push( {
        line: {
          id: line.id,
          gurmukhi: {
            akhar: line.gurmukhi.replace( /[;,.]/ug, '' ),
            unicode: toUnicode( line.gurmukhi ).replace( /[;,.]/ug, '' ),
          },
          larivaar: {
            akhar: line.gurmukhi
              .replace( /\s/ug, '\u200B' ),
            unicode: toUnicode( line.gurmukhi )
              .replace( /\s/ug, '\u200B' ),
          },
          translation: {
            english: {
              default: '',
            },
            punjabi: {
              default: {
                akhar: '',
                unicode: '',
              },
            },
            spanish: '',
          },
          transliteration: {
            english: {
              text: line.transliterations[ 0 ].transliteration
                .replace( /[;,.]/ug, '' ),
              larivaar: line.transliterations[ 0 ].transliteration
                .replace( /[;,.]/ug, '' )
                .replace( /\s/ug, '\u200B' ),
            },
            devanagari: {
              text: line.transliterations[ 1 ].transliteration
                .replace( /[;,.]/ug, '' ),
              larivaar: line.transliterations[ 1 ].transliteration
                .replace( /[;,.]/ug, '' )
                .replace( /\s/ug, '\u200B' ),
            },
          },
          linenum: line.sourceLine,
          firstletters: {
            akhar: line.firstLetters,
            unicode: toUnicode( line.firstLetters ),
          },
        },
      } )
      line.translations.forEach( translation => {
        if ( translation.translationSource.language.id === 1 ) {
          shabadLines.shabad[ index ].line.translation.english.default = translation.translation
        }
        if ( translation.translationSource.language.id === 2 ) {
          shabadLines.shabad[ index ].line.translation.punjabi.default = {
            akhar: toAscii( translation.translation ),
            unicode: translation.translation,
          }
        }
        if ( translation.translationSource.language.id === 3 ) {
          shabadLines.shabad[ index ].line.translation.spanish = translation.translation
        }
      } )
    } )
    return shabadLines
  } )

export default getShabad
