import { Shabads } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams } from '../tools'
import translationSources from '../translationSources'

/**
 * Get Shabad from Shabad id
 * @param {string} shabadId The ID of the Shabad to query.
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
    shabad.lines.forEach( line => {
      let english = ''
      let punjabi = { akhar: '', unicode: '' }
      let spanish = ''
      line.translations.forEach( translation => {
        if ( translation.translationSource.language.id === 1 ) {
          english = translation.translation
        }
        if ( translation.translationSource.language.id === 2 ) {
          punjabi = {
            akhar: toAscii( translation.translation ),
            unicode: translation.translation,
          }
        }
        if ( translation.translationSource.language.id === 3 ) {
          spanish = translation.translation
        }
      } )

      shabadLines.shabad.push( {
        line: {
          id: line.id,
          gurmukhi: {
            akhar: stripVishraams( line.gurmukhi ),
            unicode: toUnicode( stripVishraams( line.gurmukhi ) ),
          },
          larivaar: {
            akhar: textLarivaar( stripVishraams( line.gurmukhi ) ),
            unicode: textLarivaar( toUnicode( stripVishraams( line.gurmukhi ) ) ),
          },
          translation: {
            english: {
              default: english,
            },
            punjabi: {
              default: punjabi,
            },
            spanish,
          },
          transliteration: {
            english: {
              text: stripVishraams( line.transliterations[ 0 ].transliteration ),
              larivaar: textLarivaar(
                stripVishraams( line.transliterations[ 0 ].transliteration ),
              ),
            },
            devanagari: {
              text: stripVishraams( line.transliterations[ 1 ].transliteration ),
              larivaar: textLarivaar(
                stripVishraams( line.transliterations[ 0 ].transliteration ),
              ),
            },
          },
          linenum: line.sourceLine,
          firstletters: {
            akhar: line.firstLetters,
            unicode: toUnicode( line.firstLetters ),
          },
        },
      } )
    } )
    return shabadLines
  } )

export default getShabad
