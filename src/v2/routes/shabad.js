import { Shabads } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams } from '../tools'
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
    .withTransliterations( [ 1, 4 ] )
    .then( ( [ shabad ] ) => shabad )

  const shabadLines = {
    shabadinfo: {
      shabadid: shabadData.id,
      pageno: shabadData.lines[ 0 ].sourcePage,
      source: {
        id: shabadData.source.id,
        akhar: shabadData.source.nameGurmukhi,
        unicode: toUnicode( shabadData.source.nameGurmukhi ),
        english: shabadData.source.nameEnglish,
        length: shabadData.source.length,
        pageName: {
          akhar: shabadData.source.pageNameGurmukhi,
          unicode: toUnicode( shabadData.source.pageNameGurmukhi ),
          english: shabadData.source.pageNameEnglish,
        },
      },
      writer: {
        id: shabadData.writer.id,
        akhar: shabadData.writer.nameGurmukhi,
        unicode: toUnicode( shabadData.writer.nameGurmukhi ),
        english: shabadData.writer.nameEnglish,
      },
      raag: {
        id: shabadData.section.id,
        akhar: shabadData.section.nameGurmukhi,
        unicode: toUnicode( shabadData.section.nameGurmukhi ),
        english: shabadData.section.nameEnglish,
        startang: shabadData.section.startPage,
        endang: shabadData.section.endPage,
        raagwithpage: `${shabadData.section.nameEnglish} (${shabadData.section.startPage}-${shabadData.section.endPage})`,
      },
      count: shabadData.lines.length,
    },
    shabad: [],
  }

  shabadLines.shabad = shabadData.lines.reduce( ( lines, line ) => ( [
    ...lines,
    {
      line: {
        id: line.id,
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
            default: line.translations.find( (
              ( { translationSource: { language: { id } } } ) => id === 1 ) ).translation,
          },
          punjabi: {
            default: {
              akhar: toAscii( line.translations.find( (
                ( { translationSource: { language: { id } } } ) => id === 2 ) ).translation ),
              unicode: line.translations.find( (
                ( { translationSource: { language: { id } } } ) => id === 2 ) ).translation,
            },
          },
          spanish: line.translations.find( (
            ( { translationSource: { language: { id } } } ) => id === 3 ) ).translation,
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
        linenum: line.sourceLine,
        firstletters: {
          akhar: line.firstLetters,
          unicode: toUnicode( line.firstLetters ),
        },
      },
    },
  ] ), [] )

  return shabadLines
}

export default getShabad
