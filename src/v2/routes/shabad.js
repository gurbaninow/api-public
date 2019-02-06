import { Shabads } from '@shabados/database'
import { toUnicode, toAscii } from 'gurmukhi-utils'

import translationSources from '../translationSources'

/**
 * Get Shabad from Shabad id
 * @param {number} shabadId The ID of the Shabad to query.
 */
const getShabad = shabadId => Shabads.query()
  .where( 'shabads.id', shabadId )
  .eager( '[writer, section, source, lines]' )
  .withTranslations( translationSources )
  .withTransliterations( [ 1, 4 ] )
  .then( ( [ shabad ] ) => shabad )

export default getShabad
