import { Router } from 'express'

import search from './routes/search'
import getShabad from './routes/shabad'
import getPage from './routes/page'

const api = Router()

// Root response
api.get( '/', ( req, res, next ) => {
  const { mode } = req.query
  if ( !mode ) {
    throw new Error( 'APIv1 mode is not given.' )
  }
  let response
  if ( +mode === 1 ) {
    response = search(
      req.query.q,
      req.query.searchtype,
      req.query.source,
      req.query.writer,
      req.query.raag,
      req.query.ang,
      req.query.results,
    )
  } else if ( +mode === 2 ) {
    response = getShabad( req.query.shabadNo )
  } else if ( +mode === 3 ) {
    response = getPage( 1, +req.query.ang )
  }
  response.then( result => res.json( { ...result, error: false } ) )
    .catch( next )
} )

export default api
