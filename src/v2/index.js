import { Router } from 'express'

import getSources from './routes/sources'
import getShabad from './routes/shabad'
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
    .then( result => res.json( { ...result, error: false } ) )
    .catch( ( { message } ) => res.status( 400 ).json( { error: true, message } ) )
) )

// Get Shabad from id
api.get( '/shabad/:shabadId', ( req, res ) => (
  getShabad( req.params.shabadId )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( ( { message } ) => res.status( 400 ).json( {
      params: req.params,
      error: true,
      message,
    } ) )
) )

// Get Ang from Sri Guru Granth Sahib Ji
api.get( '/ang/:pageNum', ( req, res ) => (
  getPage( 1, req.params.pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( ( { message } ) => res.status( 400 ).json( {
      params: req.params,
      error: true,
      message,
    } ) )
) )

// Get Page of specific source
api.get( '/ang/:pageNum/:sourceId', ( req, res ) => (
  getPage( req.params.sourceId, req.params.pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( ( { message } ) => res.status( 400 ).json( {
      params: req.params,
      error: true,
      message,
    } ) )
) )

export default api
