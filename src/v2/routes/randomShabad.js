import { Shabads } from '@shabados/database'
import { raw } from 'objection'

/**
 * Get Random Shabad ID from SGGS
 * @async
 */
const getRandomShabad = async () => {
  const shabadId = await Shabads.query()
    .select( 'id' )
    .where( 'source_id', 1 )
    .orderBy( raw( 'rand()' ) )
    .limit( 1 )
    .then( result => ( result[ 0 ].id ) )

  return shabadId
}

export default getRandomShabad
