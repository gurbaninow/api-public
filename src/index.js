import { Router } from 'express'
import git from 'git-rev-sync'
import { hostname } from 'os'

import apiv2 from './v2'
import apiv1 from './v1'

// Set up API
const api = Router()

// Root response
api.get( '/', ( req, res ) => (
  res.json( {
    name: 'GurbaniNow API',
    version: git.long(),
    docs: 'Visit https://github.com/GurbaniNow/gurbaninow-api for more information and documentation.',
    ray: req.headers[ 'cf-ray' ] || hostname(),
  } )
) )

// Import APIv2
api.use( '/v2', apiv2 )

// Import APIv1
api.use( '/v1', apiv1 )

export default api
