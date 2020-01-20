import { Router } from 'express'

import { getSources, getWriters } from './routes/meta'
import search from './routes/search'
import getShabad from './routes/shabad'
import getRandomShabad from './routes/randomShabad'
import getLine from './routes/line'
import getHukamnama from './routes/hukamnama'
import getPage from './routes/page'
import convertText from './routes/convert'
import { getBanis, getBaniLines } from './routes/banis'

const api = Router()

// Root response
api.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API v2',
    version: 2,
  } )
) )

// Get List of Sources
api.get( '/meta/sources', ( _, res, next ) => (
  getSources()
    .then( result => res.json( result ) )
    .catch( next )
) )

// Get List of Writers
api.get( '/meta/writers', ( _, res, next ) => (
  getWriters()
    .then( result => res.json( result ) )
    .catch( next )
) )

// Get List of Baanis
api.get( '/banis/', ( _, res, next ) => (
  getBanis()
    .then( result => res.json( result ) )
    .catch( next )
) )

// Get List of Baanis
api.get( '/banis/:baniId', ( req, res, next ) => (
  getBaniLines( req.params.baniId )
    .then( result => res.json( result ) )
    .catch( next )
) )

// Search Query
api.get( '/search/:query', ( req, res, next ) => (
  search(
    req.params.query,
    req.query.searchtype,
    req.query.source,
    req.query.writer,
    req.query.raag,
    req.query.ang,
    req.query.results,
    req.query.skip,
  ).then( result => res.json( { ...result, error: false } ) )
    .catch( next )
) )

// Get Random Shabad
api.get( '/shabad/random', ( _, res, next ) => (
  getRandomShabad()
    .then( result => res.redirect( `/v2/shabad/${result}` ) )
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
api.get( '/hukamnama', ( _, res ) => res.redirect( '/v2/hukamnama/today' ) )

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
api.get( '/ang/:pageNum/:sourceId', ( req, res ) => {
  const oldSourceIds = {
    G: 1,
    D: 2,
    B: 3,
    N: 7,
    A: 11,
    U: 11,
  }
  if ( [ 'G', 'D', 'B', 'N', 'A', 'U' ].includes( req.params.sourceId ) ) {
    res.redirect( `/v2/ang/${req.params.pageNum}?source=${oldSourceIds[ req.params.sourceId ]}` )
  } else {
    res.redirect( `/v2/ang/${req.params.pageNum}?source=${req.params.sourceId}` )
  }
} )

// Converter
api.get( '/convert/:type/:text', ( req, res ) => res.json( convertText( req.params.type, req.params.text ) ) )

export default api
