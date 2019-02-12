import { Banis } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams } from '../tools'
import translationSources from '../translationSources'

/**
 * Gets all Baanis
 * @async
 */
export const getBanis = async () => {
  const banisData = await Banis.query()

  return banisData.reduce( ( banis, bani ) => ( [
    ...banis,
    {
      id: bani.id,
      akhar: bani.nameGurmukhi,
      unicode: toUnicode( bani.nameGurmukhi ),
      english: bani.nameEnglish,
    },
  ] ), [] )
}

export const getBaniLines = async baniId => {
  const baniData = await Banis.query()
    .eager( 'lines.shabad.[section.source, writer]' )
    .orderBy( [ 'line_group', 'l.order_id' ] )
    .where( 'banis.id', baniId )
    .withTranslations( translationSources )
    .withTransliterations( [ 1, 4 ] )
    .eagerOptions( { minimize: false, aliases: { lines: 'l' } } )
    .then( ( [ bani ] ) => bani )

  const firstLine = baniData.lines[ 0 ]
  const baniLines = {
    baniinfo: {
      id: baniData.id,
      akhar: baniData.nameGurmukhi,
      unicode: toUnicode( baniData.nameGurmukhi ),
      english: baniData.nameEnglish,
      pageno: firstLine.sourcePage,
      source: {
        id: firstLine.shabad.section.source.id,
        akhar: firstLine.shabad.section.source.nameGurmukhi,
        unicode: toUnicode( firstLine.shabad.section.source.nameGurmukhi ),
        english: firstLine.shabad.section.source.nameEnglish,
        length: firstLine.shabad.section.source.length,
        pageName: {
          akhar: firstLine.shabad.section.source.pageNameGurmukhi,
          unicode: toUnicode( firstLine.shabad.section.source.pageNameGurmukhi ),
          english: firstLine.shabad.section.source.pageNameEnglish,
        },
      },
      writer: {
        id: firstLine.shabad.writer.id,
        akhar: firstLine.shabad.writer.nameGurmukhi,
        unicode: toUnicode( firstLine.shabad.writer.nameGurmukhi ),
        english: firstLine.shabad.writer.nameEnglish,
      },
      raag: {
        id: firstLine.shabad.section.id,
        akhar: firstLine.shabad.section.nameGurmukhi,
        unicode: toUnicode( firstLine.shabad.section.nameGurmukhi ),
        english: firstLine.shabad.section.nameEnglish,
        startang: firstLine.shabad.section.startPage,
        endang: firstLine.shabad.section.endPage,
        raagwithpage: `${firstLine.shabad.section.nameEnglish} (${firstLine.shabad.section.startPage}-${firstLine.shabad.section.endPage})`,
      },
      count: baniData.lines.length,
    },
    bani: [],
  }

  baniLines.bani = baniData.lines.reduce( ( lines, line ) => ( [
    ...lines,
    {
      line: {
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
        pageno: line.sourcePage,
        lineno: line.sourceLine,
        firstletters: {
          akhar: line.firstLetters,
          unicode: toUnicode( line.firstLetters ),
        },
      },
    },
  ] ), [] )

  return baniLines
}
