import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import translationSources from '../translationSources'

/**
 * Get all the lines on a page for a source.
 * @param {number} sourceId The ID of the source to use.
 * @param {number} pageNum The page in the source to retrieve all lines from.
 */
const getPage = ( sourceId, pageNum ) => Lines.query()
  .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
  .eager( 'shabad.[section.source, writer]' )
  .withTranslations( translationSources )
  .withTransliterations( [ 1, 4 ] )
  .where( 'source_page', pageNum )
  .andWhere( 'shabads.source_id', sourceId )
  .orderBy( 'order_id' )
  .then( lines => lines.map( line => {
    line.gurmukhi = line.gurmukhi.replace( /[;,.]/ug, '' )
    return line
  } ) )
  .then( lines => {
    const pageLines = {
      pageno: pageNum,
      source: {
        id: sourceId,
        akhar: lines[ 0 ].shabad.section.source.nameGurmukhi,
        unicode: toUnicode( lines[ 0 ].shabad.section.source.nameGurmukhi ),
        english: lines[ 0 ].shabad.section.source.nameEnglish,
        length: lines[ 0 ].shabad.section.source.length,
        pageName: {
          akhar: lines[ 0 ].shabad.section.source.pageNameGurmukhi,
          unicode: toUnicode( lines[ 0 ].shabad.section.source.pageNameGurmukhi ),
          english: lines[ 0 ].shabad.section.source.pageNameEnglish,
        },
      },
      count: lines.length,
      page: [],
    }
    lines.forEach( ( line, index ) => {
      pageLines.page.push( {
        line: {
          id: line.id,
          shabadid: line.shabadId,
          gurmukhi: {
            akhar: line.gurmukhi,
            unicode: toUnicode( line.gurmukhi ),
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
          writer: {
            id: line.shabad.writer.id,
            akhar: line.shabad.writer.nameGurmukhi,
            unicode: toUnicode( line.shabad.writer.nameGurmukhi ),
            english: line.shabad.writer.nameEnglish,
          },
          raag: {
            id: line.shabad.section.id,
            akhar: line.shabad.section.nameGurmukhi,
            unicode: toUnicode( line.shabad.section.nameGurmukhi ),
            english: line.shabad.section.nameEnglish,
            startang: line.shabad.section.startPage,
            endang: line.shabad.section.endPage,
            raagwithpage: `${line.shabad.section.nameEnglish} (${line.shabad.section.startPage}-${line.shabad.section.endPage})`,
          },
          pageno: line.sourcePage,
          lineno: line.sourceLine,
          firstletters: {
            akhar: line.firstLetters,
            unicode: toUnicode( line.firstLetters ),
          },
        },
      } )
      line.translations.forEach( translation => {
        if ( translation.translationSource.language.id === 1 ) {
          pageLines.page[ index ].line.translation.english.default = translation.translation
        }
        if ( translation.translationSource.language.id === 2 ) {
          pageLines.page[ index ].line.translation.punjabi.default = {
            akhar: toAscii( translation.translation ),
            unicode: translation.translation,
          }
        }
        if ( translation.translationSource.language.id === 3 ) {
          pageLines.page[ index ].line.translation.spanish = translation.translation
        }
      } )
    } )
    return pageLines
  } )

export default getPage
