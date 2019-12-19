import { URL, URLSearchParams } from 'url'
import { Shabads } from '@shabados/database'
import { getNanakshahiDate, findBikramiDate } from 'nanakshahi'
import { toUnicode, toAscii } from 'gurmukhi-utils'
import fetch from 'node-fetch'
import parser from 'fast-xml-parser'
import months from 'months'
import days from 'days'

import { textLarivaar, stripVishraams, getTranslation, getTransliteration } from '../tools'

/**
 * Get Hukamnama from Sri Darbar Sahib via SikhNet
 * A date can be provided access Hukamnama Archives,
 * otherwise today's Hukamnama is returned.
 * @param {object} [date] JavaScript Date object
 * @async
 */
const getHukamnama = async ( date = false ) => {
  // Hukam Archives start from 2002
  if ( date && date.getFullYear() < 2002 ) {
    throw new RangeError( 'Hukamnama Archives are not available before 2002.' )
  }

  // Build URL
  const hukamUrl = new URL( 'http://www.sikhnet.com/webapps/gmcws/hukam.php' )
  if ( date ) {
    hukamUrl.search = new URLSearchParams( {
      date: date.toISOString().split( 'T' )[ 0 ],
    } )
  }

  // Fetch Hukam Data
  const hukamData = await fetch( hukamUrl )
  const reqBody = await hukamData.text()
  // eslint-disable-next-line camelcase
  const { results: { hukam_date, sids } } = parser.parse( reqBody )

  let hukamDate
  try {
    hukamDate = new Date( Date.parse( hukam_date ) )
  } catch ( e ) {
    throw new Error( `Error with SikhNet Source. Internal error: ${e.message}` )
  }
  if ( date && date.getDate() !== hukamDate.getDate() ) {
    throw new Error( 'Hukamnama not available for this day.' )
  }

  const shabadIds = sids.toString().split( ',' )

  const hukam = await shabadIds
    .reduce( ( query, shabadId ) => query.orWhere( 'shabads.sttm_id', +shabadId ), Shabads.query() )
    .eager( '[writer, section, source, lines]' )
    .withTranslations( query => query.eager( 'translationSource.language' ) )
    .withTransliterations( query => query.eager( 'language' ) )
    .then( shabads => ( { date: hukamDate, shabads } ) )

  let nanakshahiDate
  try {
    nanakshahiDate = getNanakshahiDate( hukam.date )
  } catch ( e ) {
    // Use Bikrami Calendar for date before 1 Chet, 535 NS (Nanakshahi Adoption)
    const { solarDate } = findBikramiDate( date )
    solarDate.englishDate.year -= 1525
    solarDate.punjabiDate.year = toUnicode( solarDate.englishDate.year.toString() )
    nanakshahiDate = { ...solarDate }
  }

  const [ firstShabad ] = hukam.shabads
  const count = hukam.shabads.reduce( ( acc, { lines } ) => acc + lines.length, 0 )

  const hukamLines = {
    date: {
      gregorian: {
        month: months[ hukam.date.getMonth() ],
        monthno: hukam.date.getMonth() + 1,
        date: hukam.date.getDate(),
        year: hukam.date.getFullYear(),
        day: days[ hukam.date.getDay() ],
      },
      nanakshahi: {
        english: {
          month: nanakshahiDate.englishDate.monthName,
          monthno: nanakshahiDate.englishDate.month,
          date: nanakshahiDate.englishDate.date,
          year: nanakshahiDate.englishDate.year,
          day: nanakshahiDate.englishDate.day,
        },
        punjabi: {
          month: nanakshahiDate.punjabiDate.monthName,
          monthno: nanakshahiDate.punjabiDate.month,
          date: nanakshahiDate.punjabiDate.date,
          year: nanakshahiDate.punjabiDate.year,
          day: nanakshahiDate.punjabiDate.day,
        },
      },
    },
    hukamnamainfo: {
      shabadid: hukam.shabads.map( ( { id } ) => id ),
      pageno: firstShabad.lines[ 0 ].sourcePage,
      source: {
        id: firstShabad.source.id,
        akhar: firstShabad.source.nameGurmukhi,
        unicode: toUnicode( firstShabad.source.nameGurmukhi ),
        english: firstShabad.source.nameEnglish,
        length: firstShabad.source.length,
        pageName: {
          akhar: firstShabad.source.pageNameGurmukhi,
          unicode: toUnicode( firstShabad.source.pageNameGurmukhi ),
          english: firstShabad.source.pageNameEnglish,
        },
      },
      writer: {
        id: firstShabad.writer.id,
        akhar: firstShabad.writer.nameGurmukhi,
        unicode: toUnicode( firstShabad.writer.nameGurmukhi ),
        english: firstShabad.writer.nameEnglish,
      },
      raag: {
        id: firstShabad.section.id,
        akhar: firstShabad.section.nameGurmukhi,
        unicode: toUnicode( firstShabad.section.nameGurmukhi ),
        english: firstShabad.section.nameEnglish,
        startang: firstShabad.section.startPage,
        endang: firstShabad.section.endPage,
        raagwithpage: `${firstShabad.section.nameEnglish} (${firstShabad.section.startPage}-${firstShabad.section.endPage})`,
      },
      count,
    },
    hukamnama: [],
  }

  hukamLines.hukamnama = hukam.shabads.reduce( ( lines, shabad ) => ( [
    ...lines,
    ...shabad.lines.map( ( {
      id,
      gurmukhi,
      translations,
      transliterations,
      sourceLine: linenum,
      firstLetters,
    } ) => ( { line: {
      id,
      gurmukhi: {
        akhar: stripVishraams( gurmukhi ),
        unicode: toUnicode( stripVishraams( gurmukhi ) ),
      },
      larivaar: {
        akhar: textLarivaar( stripVishraams( gurmukhi ) ),
        unicode: textLarivaar( toUnicode( stripVishraams( gurmukhi ) ) ),
      },
      translation: {
        english: {
          default: getTranslation( translations, 1 ),
        },
        punjabi: {
          default: {
            akhar: toAscii( getTranslation( translations, 2 ) ),
            unicode: getTranslation( translations, 2 ),
          },
        },
        spanish: getTranslation( translations, 3 ),
      },
      transliteration: {
        english: {
          text: stripVishraams(
            getTransliteration( transliterations, 1 ),
          ),
          larivaar: textLarivaar(
            stripVishraams( getTransliteration( transliterations, 1 ) ),
          ),
        },
        devanagari: {
          text: stripVishraams(
            getTransliteration( transliterations, 4 ),
          ),
          larivaar: textLarivaar(
            stripVishraams( getTransliteration( transliterations, 4 ) ),
          ),
        },
      },
      linenum,
      firstletters: {
        akhar: firstLetters,
        unicode: toUnicode( firstLetters ),
      },
    } } ) ),
  ] ), [] )

  return hukamLines
}

export default getHukamnama
