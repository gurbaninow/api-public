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
    .catch( err => res.status( 400 ).json( { error: true, ...err } ) )
) )

// Get Shabad from id
api.get( '/shabad/:shabadId', ( { params: { shabadId } }, res ) => (
  getShabad( shabadId )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( { error: true, ...err } ) )
) )

// Get Ang from Sri Guru Granth Sahib Ji
api.get( '/ang/:pageNum', ( { params: { pageNum } }, res ) => (
  getPage( 1, pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( { pageno: pageNum, error: true, ...err } ) )
) )

// Get Page of specific source
api.get( '/ang/:pageNum/:sourceId', ( { params: { pageNum, sourceId } }, res ) => (
  getPage( sourceId, pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( { pageno: pageNum, error: true, ...err } ) )
) )

export default api
