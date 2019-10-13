import { Translations } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

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
const translationSearch = async (
  query,
  searchType,
  sourceId = 0,
  writerId,
  sectionId,
  pageNum,
) => {
  let searchData = Translations.query()
    .eager( 'line.shabad.[section.source, writer]' )
    .whereIn( 'translation_source_id', translationSources )

  if ( +searchType === 3 ) {
    // Full Word (English)
    searchData = searchData.select( '*' )
      .distinct( 'line.id' )
      .where( 'translation', 'LIKE', `%${query}%` )
      .orderBy( 'line.order_id' )
  } else if ( +searchType === 5 ) {
    // Search All Words (English)
    const words = query.split( ' ' )
    searchData = searchData
      .select( '*' )
      .distinct( 'line.id' )
    words.forEach( word => {
      searchData = searchData.andWhere( 'translation', 'LIKE', `%${word}%` )
    } )
    searchData = searchData.orderBy( 'line.order_id' )
  } else if ( +searchType === 7 ) {
    // Search Any Words (English)
    const words = query.split( ' ' )
    searchData = searchData
      .select( '*' )
      .distinct( 'line.id' )
    words.forEach( word => {
      searchData = searchData.orWhere( 'translation', 'LIKE', `%${word}%` )
    } )
    searchData = searchData.orderBy( 'line.order_id' )
  } else {
    throw new Error( `A invalid searchtype was given: ${searchType}` )
  }

  if ( +sourceId !== 0 ) {
    searchData = searchData.andWhere( 'line:shabad.source_id', sourceId )
  }

  if ( writerId ) {
    searchData = searchData.andWhere( 'line:shabad.writer_id', writerId )
  }

  if ( sectionId ) {
    searchData = searchData.andWhere( 'line:shabad.section_id', sectionId )
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
        source: {
          id: line.line.shabad.section.source.id,
          akhar: line.line.shabad.section.source.nameGurmukhi,
          unicode: toUnicode( line.line.shabad.section.source.nameGurmukhi ),
          english: line.line.shabad.section.source.nameEnglish,
          length: line.line.shabad.section.source.length,
          pageName: {
            akhar: line.line.shabad.section.source.pageNameGurmukhi,
            unicode: toUnicode( line.line.shabad.section.source.pageNameGurmukhi ),
            english: line.line.shabad.section.source.pageNameEnglish,
          },
        },
        writer: {
          id: line.line.shabad.writer.id,
          akhar: line.line.shabad.writer.nameGurmukhi,
          unicode: toUnicode( line.line.shabad.writer.nameGurmukhi ),
          english: line.line.shabad.writer.nameEnglish,
        },
        raag: {
          id: line.line.shabad.section.id,
          akhar: line.line.shabad.section.nameGurmukhi,
          unicode: toUnicode( line.line.shabad.section.nameGurmukhi ),
          english: line.line.shabad.section.nameEnglish,
          startang: line.line.shabad.section.startPage,
          endang: line.line.shabad.section.endPage,
          raagwithpage: `${line.line.shabad.section.nameEnglish} (${line.line.shabad.section.startPage}-${line.line.shabad.section.endPage})`,
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

export default translationSearch
