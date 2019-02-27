import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { stripVishraams, getTranslation } from '../tools'
import translationSources from '../translationSources'

/**
 * Get all the lines on a page for a source.
 * @param {number} [sourceId=1] The ID of the source to use, default is Sri Guru Granth Sahib Ji.
 * @param {number} pageNum The page in the source to retrieve all lines from.
 * @async
 */
const getPage = async ( sourceId = 1, pageNum ) => {
  const pageData = await Lines.query()
    .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
    .eager( 'shabad.[section.source, writer]' )
    .withTranslations( translationSources )
    .withTransliterations( [ 1, 4 ] )
    .where( 'source_page', pageNum )
    .andWhere( 'shabads.source_id', sourceId )
    .orderBy( 'order_id' )

  const page = pageData.reduce( ( lines, line ) => ( [
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

  return { count: pageData.length, shabads: page }
}

export default getPage
