import { Shabads, knex } from '@shabados/database'
import { raw } from 'objection'

/**
 * Get Random Shabad ID from SGGS
 * @async
 */
const getRandomShabad = async () => {
  // Determine SQL Engine and use proper function
  const random = knex.client.config.client === 'mysql' ? 'rand()' : 'random()'

  return Shabads.query()
    .select( 'id' )
    .where( 'source_id', 1 )
    .orderBy( raw( random ) )
    .limit( 1 )
    .then( result => ( result[ 0 ].id ) )
}

export default getRandomShabad
