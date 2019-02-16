import { Router } from 'express'

import apiv2 from './v2'
import { version } from '../package.json'

// Set up API
const api = Router()

// Root response
api.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API',
    version,
    docs: 'Visit https://github.com/GurbaniNow/gurbaninow-api for more information and documentation.',
    ray: req.headers[ 'cf-ray' ] || null,
  } )
) )

// Import API
api.use( '/v2', apiv2 )

export default api
