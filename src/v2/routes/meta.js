import { Sections, Sources, Writers } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

/**
 * Gets all the Sections in DB.
 * @async
 */
export const getSections = async () => {
  const sectionsData = await Sections.query()

  return sectionsData.reduce( ( sections, section ) => ( [
    ...sections,
    {
      id: section.id,
      akhar: section.nameGurmukhi,
      unicode: toUnicode( section.nameGurmukhi ),
      english: section.nameEnglish,
      description: section.description,
      startang: section.startPage,
      endang: section.endPage,
      source: section.sourceId,
    },
  ] ), [] )
}

/**
 * Gets all the DB sources.
 * @async
 */
export const getSources = async () => {
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
