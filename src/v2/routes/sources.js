import { Sources } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

/**
 * Gets all the DB sources.
 */
const getSources = () => Sources
  .query()
  .then( sources => {
    const sourcesList = []
    sources.forEach( source => {
      sourcesList.push( {
        id: source.id,
        akhar: source.nameGurmukhi,
        unicode: toUnicode( source.nameGurmukhi ),
        english: source.nameEnglish,
        length: source.length,
        pageName: {
          akhar: source.pageNameGurmukhi,
          unicode: toUnicode( source.pageNameGurmukhi ),
          english: source.pageNameEnglish,
        },
      } )
    } )
    return { sources: sourcesList }
  } )

export default getSources
