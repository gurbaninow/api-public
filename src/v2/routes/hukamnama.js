import { URL, URLSearchParams } from 'url'
import { Shabads } from '@shabados/database'
import { getNanakshahiDate, getPanchang } from 'nanakshahi'
import { toUnicode, toAscii } from 'gurmukhi-utils'
import fetch from 'node-fetch'
import parser from 'fast-xml-parser'
import months from 'months'
import days from 'days'

import { textLarivaar, stripVishraams } from '../tools'
import translationSources from '../translationSources'

/**
 * Get Hukamnama from Sri Darbar Sahib via SikhNet
 * A date can be provided access Hukamnama Archives,
 * otherwise today's Hukamnama is returned.
 * @param {object} [date] JavaScript Date object
 */
const getHukamnama = ( date = false ) => {
  const hukamUrl = new URL( 'http://www.sikhnet.com/webapps/gmcws/hukam.php' )

  if ( date ) {
    hukamUrl.search = new URLSearchParams( {
      date: date.toISOString().split( 'T' )[ 0 ],
    } )
  }

  return fetch( hukamUrl )
    .then( res => res.text() )
    .then( body => parser.parse( body ) )
    .then( ( { results } ) => results )
    // eslint-disable-next-line camelcase
    .then( ( { hukam_date, sids } ) => {
      let hukamDate
      try {
        hukamDate = new Date( Date.parse( hukam_date ) )
      } catch ( e ) {
        throw new Error( `Error with SikhNet Source. Internal error: ${e.message}` )
      }
      if ( date && date.getFullYear() < 2002 ) {
        throw new Error( 'Hukamnama Archives not available before 2002.' )
      } else if ( date && date.getDate() !== hukamDate.getDate() ) {
        throw new Error( 'Hukamnama not available for this day.' )
      }

      const hukamPromise = sids
        .toString()
        .split( ',' )
        .reduce( ( query, shabadId ) => query.orWhere( 'shabads.sttm_id', +shabadId ), Shabads.query() )
        .eager( '[writer, section, source, lines]' )
        .withTranslations( translationSources )
        .withTransliterations( [ 1, 4 ] )
        .then( shabads => ( { date: hukamDate, shabads } ) )

      return hukamPromise
    } )
    .then( hukam => {
      let nanakshahiDate
      try {
        nanakshahiDate = getNanakshahiDate( hukam.date )
      } catch ( e ) {
        // Use Bikrami Calendar for date before 1 Chet, 535 NS (Nanakshahi Adoption)
        const { solarDate } = getPanchang( date )
        solarDate.englishDate.year -= 1525
        solarDate.punjabiDate.year = toUnicode( solarDate.englishDate.year.toString() )
        nanakshahiDate = { ...solarDate }
      }

      const [ firstShabad ] = hukam.shabads
      const shabadIds = hukam.shabads.map( ( { id } ) => id )
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
          shabadid: shabadIds,
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

      hukam.shabads.forEach( shabad => {
        shabad.lines.forEach( line => {
          let english = ''
          let punjabi = { akhar: '', unicode: '' }
          let spanish = ''
          line.translations.forEach( translation => {
            if ( translation.translationSource.language.id === 1 ) {
              english = translation.translation
            }
            if ( translation.translationSource.language.id === 2 ) {
              punjabi = {
                akhar: toAscii( translation.translation ),
                unicode: translation.translation,
              }
            }
            if ( translation.translationSource.language.id === 3 ) {
              spanish = translation.translation
            }
          } )

          hukamLines.hukamnama.push( {
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
                  default: english,
                },
                punjabi: {
                  default: punjabi,
                },
                spanish,
              },
              transliteration: {
                english: {
                  text: stripVishraams( line.transliterations[ 0 ].transliteration ),
                  larivaar: textLarivaar(
                    stripVishraams( line.transliterations[ 0 ].transliteration ),
                  ),
                },
                devanagari: {
                  text: stripVishraams( line.transliterations[ 1 ].transliteration ),
                  larivaar: textLarivaar(
                    stripVishraams( line.transliterations[ 0 ].transliteration ),
                  ),
                },
              },
              linenum: line.sourceLine,
              firstletters: {
                akhar: line.firstLetters,
                unicode: toUnicode( line.firstLetters ),
              },
            },
          } )
        } )
      } )

      return hukamLines
    } )
}

export default getHukamnama
