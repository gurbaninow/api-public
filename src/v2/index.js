import { Router } from 'express'

import getSources from './routes/sources'
import getPage from './routes/page'

const api = Router()

// Root response
api.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API v2',
    version: 2,
  } )
) )

// Get List of Sources
api.get( '/sources', ( _, res ) => (
  getSources()
    .then( sources => res.json( sources ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

// Get Ang from Sri Guru Granth Sahib Ji
api.get( '/ang/:pageId', ( { params: { pageId } }, res ) => (
  getPage( 1, pageId )
    .then( lines => res.json( lines ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

// Get Page of specific source
api.get( '/ang/:pageId/:sourceId', ( { params: { sourceId, pageId } }, res ) => (
  getPage( sourceId, pageId )
    .then( lines => res.json( lines ) )
    .catch( err => res.status( 400 ).json( err ) )
) )

export default api
