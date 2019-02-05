import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import apiv2 from './v2'
import { version } from '../package.json'

// Set up express app
const app = express()
app.use( cors() )
app.use( helmet( {
  frameguard: false,
} ) )
app.use( compression() )
app.set( 'etag', 'weak' )

// Root response
app.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API',
    version,
    docs: 'Visit https://github.com/GurbaniNow/gurbaninow-api for more information and documentation.',
    ray: req.headers.HTTP_CF_RAY || null,
  } )
) )

// Import API
app.use( '/v2', apiv2 )

export default app
