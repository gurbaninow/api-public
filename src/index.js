import apiv2 from './v2'
import { version } from '../package.json'

// Set up API
export default app => class API {
  constructor() {
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
    return app
  }
}
