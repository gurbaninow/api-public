import { Router } from 'express'

import getSources from './routes/sources'
import getShabad from './routes/shabad'
import getHukamnama from './routes/hukamnama'
import getPage from './routes/page'

import { errorResponse } from './tools'

const api = Router()

// Root response
api.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API v2',
    version: 2,
  } )
) )

// Get List of Sources
api.get( '/sources', ( req, res ) => (
  getSources()
    .then( result => res.json( ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
) )

// Get Shabad from id
api.get( '/shabad/:shabadId', ( req, res ) => (
  getShabad( req.params.shabadId )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
) )

// Get Hukamnama from Sri Darbar Sahib
api.get( '/hukamnama', ( _, res ) => (
  res.redirect( 'hukamnama/today' )
) )

// Get Today's Hukamnama from Sri Darbar Sahib
api.get( '/hukamnama/today', ( req, res ) => {
  getHukamnama()
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
} )

// Get Hukamnama Archive from Sri Darbar Sahib
api.get( '/hukamnama/:year/:month/:date', ( req, res ) => {
  getHukamnama( new Date( req.params.year, req.params.month - 1, req.params.date ) )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
} )

// Get Ang from Sri Guru Granth Sahib Ji
api.get( '/ang/:pageNum', ( req, res ) => (
  getPage( 1, req.params.pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
) )

// Get Page of specific source
api.get( '/ang/:pageNum/:sourceId', ( req, res ) => (
  getPage( req.params.sourceId, req.params.pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( err => res.status( 400 ).json( errorResponse( req, err ) ) )
) )

export default api
