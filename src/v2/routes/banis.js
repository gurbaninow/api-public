import { Banis } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams, getTranslation, getTransliteration } from '../tools'

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
    .withTranslations( query => query.eager( 'translationSource.language' ) )
    .withTransliterations( query => query.eager( 'language' ) )
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
            default: getTranslation( line.translations, 1 ),
          },
          punjabi: {
            default: {
              akhar: toAscii( getTranslation( line.translations, 2 ) ),
              unicode: getTranslation( line.translations, 2 ),
            },
          },
          spanish: getTranslation( line.translations, 3 ),
        },
        transliteration: {
          english: {
            text: stripVishraams(
              getTransliteration( line.transliterations, 1 ),
            ),
            larivaar: textLarivaar(
              stripVishraams( getTransliteration( line.transliterations, 1 ) ),
            ),
          },
          devanagari: {
            text: stripVishraams(
              getTransliteration( line.transliterations, 4 ),
            ),
            larivaar: textLarivaar(
              stripVishraams( getTransliteration( line.transliterations, 4 ) ),
            ),
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
