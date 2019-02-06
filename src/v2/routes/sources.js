import { Sources } from '@shabados/database'
import { toUnicode } from 'gurmukhi-utils'

/**
 * Gets all the DB sources.
 */
const getSources = () => Sources
  .query()
  .then( sources => sources.map( source => {
    source.nameUnicode = toUnicode( source.nameGurmukhi )
    return source
  } ) )

export default getSources
