import { Lines } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import { textLarivaar, stripVishraams, getTranslation, getTransliteration } from '../tools'
import { punjabiSources, englishSources, spanishSources } from '../translationSources'

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
    .withTranslations()
    .withTransliterations()
    .where( 'source_page', pageNum )
    .andWhere( 'shabads.source_id', sourceId )
    .orderBy( 'order_id' )

  const firstLine = pageData[ 0 ]
  const pageLines = {
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
    count: pageData.length,
    page: [],
  }

  pageLines.page = pageData.reduce( ( lines, line ) => ( [
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
            default: getTranslation( line.translations, englishSources ),
          },
          punjabi: {
            default: {
              akhar: toAscii( getTranslation( line.translations, punjabiSources ) ),
              unicode: getTranslation( line.translations, punjabiSources ),
            },
          },
          spanish: getTranslation( line.translations, spanishSources ),
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
        writer: {
          id: line.shabad.writer.id,
          akhar: line.shabad.writer.nameGurmukhi,
          unicode: toUnicode( line.shabad.writer.nameGurmukhi ),
          english: line.shabad.writer.nameEnglish,
        },
        raag: {
          id: line.shabad.section.id,
          akhar: line.shabad.section.nameGurmukhi,
          unicode: toUnicode( line.shabad.section.nameGurmukhi ),
          english: line.shabad.section.nameEnglish,
          startang: line.shabad.section.startPage,
          endang: line.shabad.section.endPage,
          raagwithpage: `${line.shabad.section.nameEnglish} (${line.shabad.section.startPage}-${line.shabad.section.endPage})`,
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

  return pageLines
}

export default getPage
