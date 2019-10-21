import { Sources, Writers } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

/**
 * Gets all the DB sources.
 * @async
 */
export const getSources = async () => {
  const sourcesData = await Sources.query()
    .eager( '[sections]' )
    .orderBy( [ 'id', 'sections:id' ] )

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
      sections: source.sections.reduce( ( sections, section ) => ( [
        ...sections,
        {
          id: section.id,
          akhar: section.nameGurmukhi,
          unicode: toUnicode( section.nameGurmukhi ),
          english: section.nameEnglish,
          description: section.description,
          startPage: section.startPage,
          endPage: section.endPage,
        },
      ] ), [] ),
    },
  ] ), [] )
}

/**
 * Gets all the Writers in DB.
 * @async
 */
export const getWriters = async () => {
  const writersData = await Writers.query()

  return writersData.reduce( ( writers, writer ) => ( [
    ...writers,
    {
      id: writer.id,
      akhar: writer.nameGurmukhi,
      unicode: toUnicode( writer.nameGurmukhi ),
      english: writer.nameEnglish,
    },
  ] ), [] )
}
