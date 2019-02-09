import { Sources } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

/**
 * Gets all the DB sources.
 * @async
 */
const getSources = async () => {
  const sourcesData = await Sources.query()

  return sourcesData.reduce( ( sources, source ) => ( [
    ...sources,
    {
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
    },
  ] ), [] )
}

export default getSources
