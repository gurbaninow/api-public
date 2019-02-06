import { Lines } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

import translationSources from '../translationSources'

/**
 * Get all the lines on a page for a source.
 * @param {number} sourceId The ID of the source to use.
 * @param {number} pageNum The page in the source to retrieve all lines from.
 */
const getPage = ( sourceId, pageNum ) => Lines.query()
  .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
  .eager( 'shabad.[section.source, subsection, writer]' )
  .withTranslations( translationSources[ sourceId ] )
  .withTransliterations( [ 1, 4 ] )
  .where( 'source_page', pageNum )
  .andWhere( 'shabads.source_id', sourceId )
  .orderBy( 'order_id' )
  .then( lines => lines.map( line => {
    line.firstLettersUnicode = toUnicode( line.firstLetters )
    line.gurmukhiUnicode = toUnicode( line.gurmukhi )
    line.shabad.section.nameUnicode = toUnicode( line.shabad.section.nameGurmukhi )
    line.shabad.section.source.nameUnicode = toUnicode( line.shabad.section.source.nameGurmukhi )
    // eslint-disable-next-line max-len
    line.shabad.section.source.pageNameUnicode = toUnicode( line.shabad.section.source.pageNameGurmukhi )
    line.shabad.writer.nameUnicode = toUnicode( line.shabad.writer.nameGurmukhi )
    return line
  } ) )

export default getPage
