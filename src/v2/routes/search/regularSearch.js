import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'
import isAscii from 'is-ascii'

import { textLarivaar, stripVishraams, getTranslation } from '../../tools'
import translationSources from '../../translationSources'

/**
 * Get all the lines based on query
 * @param {string} [query] Query
  * @param {number} [searchType] Search Type.
 * @param {number} [sourceId=0] The ID of the source to use. Default is all.
 * @param {number} writerId Writer ID to retrieve all lines from.
 * @param {number} sectionId Section ID to retrieve all lines from.
 * @param {number} pageNum The page in the source to retrieve all lines from.
 * @async
 */
const regularSearch = async ( query, searchType, sourceId = 0, writerId, sectionId, pageNum ) => {
  let searchData = Lines.query()
    .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
    .eager( 'shabad.[section.source, writer]' )
    .withTranslations( translationSources )
    .withTransliterations( [ 1, 4 ] )

  if ( +searchType === 0 ) {
    // First Letter Start (Gurmukhi)
    searchData = searchData.genericSearch( query, 'first_letters', true, false, false )
  } else if ( +searchType === 1 ) {
    // First Letter Anywhere (Gurmukhi)
    searchData = searchData.genericSearch( query, 'first_letters', true, true, false )
  } else if ( +searchType === 2 ) {
    // Full Word (Gurmukhi)
    searchData = searchData.fullWord( query, false, true ).orderBy( 'lines.order_id' )
  } else if ( +searchType === 4 ) {
    // Search All Words (Gurmukhi)
    const words = query.split( ' ' )
    searchData = searchData
      .select( '*' )
      .distinct( 'lines.id' )
    let asciiSearch
    words.forEach( word => {
      asciiSearch = !isAscii( word ) ? toAscii( word ) : word
      searchData = searchData.andWhere( 'gurmukhi', 'LIKE', `%${asciiSearch}%` )
    } )
    searchData = searchData.orderBy( 'lines.order_id' )
  } else if ( +searchType === 6 ) {
    // Search Any Words (Gurmukhi)
    const words = query.split( ' ' )
    searchData = searchData
      .select( '*' )
      .distinct( 'lines.id' )
    let asciiSearch
    words.forEach( word => {
      asciiSearch = !isAscii( word ) ? toAscii( word ) : word
      searchData = searchData.orWhere( 'gurmukhi', 'LIKE', `%${asciiSearch}%` )
    } )
    searchData = searchData.orderBy( 'lines.order_id' )
  } else {
    throw new Error( `A invalid searchtype was given: ${searchType}` )
  }

  if ( +sourceId !== 0 ) {
    searchData = searchData.andWhere( 'shabads.source_id', sourceId )
  }

  if ( writerId ) {
    searchData = searchData.andWhere( 'shabads.writer_id', writerId )
  }

  if ( sectionId ) {
    searchData = searchData.andWhere( 'shabads.section_id', sectionId )
  }

  if ( pageNum ) {
    searchData = searchData.andWhere( 'source_page', pageNum )
  }

  searchData = await searchData

  return searchData.reduce( ( lines, line ) => ( [
    ...lines,
    {
      shabad: {
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
            default: getTranslation( line.translations, 1 ),
          },
          punjabi: {
            default: {
              akhar: toAscii( getTranslation( line.translations, 2 ) ),
              unicode: getTranslation( line.translations, 2 ),
            },
          },
          spanish: getTranslation( line.translations, 3 ),
        },
        transliteration: {
          english: {
            text: stripVishraams( line.transliterations.find( (
              ( { language: { id } } ) => id === 1 ) ).transliteration ),
            larivaar: textLarivaar( stripVishraams( line.transliterations.find( (
              ( { language: { id } } ) => id === 1 ) ).transliteration ) ),
          },
          devanagari: {
            text: stripVishraams( line.transliterations.find( (
              ( { language: { id } } ) => id === 4 ) ).transliteration ),
            larivaar: textLarivaar( stripVishraams( line.transliterations.find( (
              ( { language: { id } } ) => id === 4 ) ).transliteration ) ),
          },
        },
        source: {
          id: line.shabad.section.source.id,
          akhar: line.shabad.section.source.nameGurmukhi,
          unicode: toUnicode( line.shabad.section.source.nameGurmukhi ),
          english: line.shabad.section.source.nameEnglish,
          length: line.shabad.section.source.length,
          pageName: {
            akhar: line.shabad.section.source.pageNameGurmukhi,
            unicode: toUnicode( line.shabad.section.source.pageNameGurmukhi ),
            english: line.shabad.section.source.pageNameEnglish,
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
    },
  ] ), [] )
}

export default regularSearch
