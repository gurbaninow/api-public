import { Router } from 'express'

import getShabad from './routes/shabad'
import getPage from './routes/page'

const api = Router()

// Root response
api.get( '/', ( req, res, next ) => {
  const { mode } = req.query
  let response
  if ( +mode === 2 ) {
    response = getShabad( req.query.shabadNo )
  } else if ( +mode === 3 ) {
    response = getPage( 1, +req.query.ang )
  }
  response.then( result => res.json( { ...result, error: false } ) )
    .catch( next )
} )

export default api
