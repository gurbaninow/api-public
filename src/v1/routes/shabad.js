import { Shabads } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

import { stripVishraams, getTranslation } from '../tools'
import translationSources from '../translationSources'

/**
 * Get Shabad from Shabad id
 * @param {string} shabadId The ID of the Shabad to query.
 * @async
 */
const getShabad = async shabadId => {
  const shabadData = await Shabads.query()
    .where( 'shabads.id', shabadId )
    .eager( '[writer, section, source, lines]' )
    .withTranslations( translationSources )
    .withTransliterations( [ 1 ] )
    .then( ( [ shabad ] ) => shabad )

  const shabad = shabadData.lines.reduce( ( lines, line ) => ( [
    ...lines,
    {
      shabad: {
        ShabadId: line.id,
        ShabadNo: shabadData.id,
        PageNo: line.sourcePage,
        LineNo: line.sourceLine,
        WriterId: shabadData.writer.id,
        WriterEnglish: shabadData.writer.nameEnglish,
        RaagId: shabadData.section.id,
        RaagEnglish: shabadData.section.nameEnglish,
        SourceId: shabadData.source.id,
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

  return { gurbani: shabad }
}

export default getShabad
