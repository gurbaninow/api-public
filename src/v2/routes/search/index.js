import regularSearch from './regularSearch'
// import translationSearch from './translationSearch'

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
const search = async ( query, searchType = 0, sourceId = 0, writerId, sectionId, pageNum, limit = 20, skip = 0 ) => {
  let searchData
  if ( [ 0, 1, 2, 4, 6 ].includes( +searchType ) ) {
    // Regular Searching (Using Lines)
    searchData = await regularSearch( query, searchType, sourceId, writerId, sectionId, pageNum )
  } else if ( [ 3, 5, 7 ].includes( +searchType ) ) {
    // Translation Searching (Using Translations)
    throw new Error( 'English Translation Seaching not Supported at the Moment!' )
    /* searchData = await translationSearch(
      query, searchType, sourceId, writerId, sectionId, pageNum,
    ) */
  } else {
    throw new Error( `A invalid searchtype was given: ${searchType}` )
  }

  const count = searchData.length

  if ( +limit > 100 ) {
    throw new Error( `A invalid results number was given: ${limit}` )
  } else if ( +skip > 0 ) {
    searchData.splice( 0, +skip )
    if ( searchData.length >= +limit ) {
      searchData.length = +limit
    }
  } else if ( count >= +limit ) {
    searchData.length = +limit
  }

  return {
    inputvalues: {
      searchvalue: query,
      searchtype: searchType,
      source: sourceId,
      writer: writerId,
      raag: sectionId,
      page: pageNum,
      results: limit,
      skip,
    },
    count,
    shabads: searchData,
  }
}

export default search
