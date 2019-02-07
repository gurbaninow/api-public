import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams } from '../tools'
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
    lines.forEach( line => {
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

      pageLines.page.push( {
        line: {
          id: line.id,
          shabadid: line.shabadId,
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
    } )
    return pageLines
  } )

export default getPage
