import { Lines } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

import { stripVishraams, getTranslation } from '../tools'
import translationSources from '../translationSources'

/**
 * Get all the lines based on query
 * @param {string} [query] Query
 * @param {number} [searchType=0] Search Type. Default is First Letter Start.
 * @param {number} [sourceId=0] The ID of the source to use. Default is all.
 * @param {number} writerId Writer ID to retrieve all lines from.
 * @param {number} sectionId Section ID to retrieve all lines from.
 * @param {number} pageNum The page in the source to retrieve all lines from.
 * @param {number} [limit=100] Limit result to a certain number of lines.
 * @async
 */
// eslint-disable-next-line max-len
const search = async ( query, searchType = 0, sourceId = 0, writerId, sectionId, pageNum, limit = 20 ) => {
  let searchData = Lines.query()
    .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
    .eager( 'shabad.[section.source, writer]' )
    .withTranslations( translationSources )
    .withTransliterations( [ 1, 4 ] )

  if ( +searchType === 0 ) {
    searchData = searchData.firstLetters( query )
  } else if ( +searchType === 1 ) {
    searchData = searchData.firstLetters( query )
  } else if ( +searchType === 2 ) {
    searchData = searchData.fullWord( query ).orderBy( 'order_id' )
  } else if ( +searchType === 3 ) {
    throw new Error( 'English Translation Searching not Supported at the Moment.' )
  } else {
    throw new Error( `A invalid searchtype was given: ${searchType}` )
  }

  if ( +sourceId !== 0 ) {
    searchData = searchData.where( 'shabads.source_id', sourceId )
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

  if ( +limit <= 100 ) {
    searchData = searchData.limit( limit )
  } else {
    throw new Error( `A invalid results number was given: ${limit}` )
  }

  searchData = await searchData

  const results = searchData.reduce( ( lines, line ) => ( [
    ...lines,
    {
      shabad: {
        ShabadId: line.id,
        ShabadNo: line.shabadId,
        PageNo: line.sourcePage,
        LineNo: line.sourceLine,
        WriterId: line.shabad.writer.id,
        WriterGurmukhi: line.shabad.writer.nameGurmukhi,
        WriterEnglish: line.shabad.writer.nameEnglish,
        RaagId: line.shabad.section.id,
        RaagGurmukhi: line.shabad.section.nameGurmukhi,
        RaagEnglish: line.shabad.section.nameEnglish,
        RaagWithPage: `${line.shabad.section.nameEnglish} (${line.shabad.section.startPage}-${line.shabad.section.endPage})`,
        StartId: line.shabad.section.startPage,
        EndId: line.shabad.section.endPage,
        SourceId: line.shabad.section.source.id,
        Bisram: '',
        FirstLetterStr: toUnicode( line.firstLetters ),
        FirstLetterEng: line.firstLetters,
        MainLetters: '',
        Gurmukhi: stripVishraams( line.gurmukhi ),
        English: getTranslation( line.translations, 1 ),
        Punjabi: getTranslation( line.translations, 2 ),
        Spanish: getTranslation( line.translations, 3 ),
        Transliteration: stripVishraams( line.transliterations.find( (
          ( { language: { id } } ) => id === 1 ) ).transliteration ),
      },
    },
  ] ), [] )

  return { count: searchData.length, shabads: results }
}

export default search
