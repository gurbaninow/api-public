import { Router } from 'express'

import getSources from './routes/sources'
import getShabad from './routes/shabad'
import getLine from './routes/line'
import getHukamnama from './routes/hukamnama'
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
api.get( '/sources', ( _, res, next ) => (
  getSources()
    .then( result => res.json( ) )
    .catch( next )
) )

// Get Shabad from id
api.get( '/shabad/:shabadId', ( req, res, next ) => (
  getShabad( req.params.shabadId )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( next )
) )

// Get Line from id
api.get( '/line/:lineId', ( req, res, next ) => (
  getLine( req.params.lineId )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( next )
) )

// Get Hukamnama from Sri Darbar Sahib
api.get( '/hukamnama', ( _, res ) => res.redirect( 'hukamnama/today' ) )

// Get Today's Hukamnama from Sri Darbar Sahib
api.get( '/hukamnama/today', ( _, res, next ) => {
  getHukamnama()
    .then( result => res.json( { ...result, error: false } ) )
    .catch( next )
} )

// Get Hukamnama Archive from Sri Darbar Sahib
api.get( '/hukamnama/:year/:month/:date', ( req, res, next ) => {
  const { params: { year, month, date } } = req

  getHukamnama( new Date( year, month - 1, date ) )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( next )
} )

// Get Ang from Sri Guru Granth Sahib Ji
api.get( '/ang/:pageNum', ( req, res, next ) => (
  getPage( req.query.source, req.params.pageNum )
    .then( result => res.json( { ...result, error: false } ) )
    .catch( next )
) )

// Get Page of specific Source (Depricated)
api.get( '/ang/:pageNum/:sourceId', ( req, res ) => (
  res.redirect( `/v2/ang/${req.params.pageNum}?source=${req.params.sourceId}` )
) )

export default api
