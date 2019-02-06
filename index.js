import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import api from './src'
import updateDB from './updateDB'

console.log( 'GurbaniNow API starting...' )

// Set up Express server
let app = express()
app.use( cors() )
app.use( helmet( {
  frameguard: false,
} ) )
app.use( compression() )
app.set( 'etag', 'weak' )

// Setup API Routes
const API = api( app )
app = new API()

// Start Express server
console.log( 'Setting up Express...' )
const { PORT } = process.env
const port = PORT || 13131
app.listen( port, () => console.log( `Server running on port ${port}` ) )

// Start the database update loop
updateDB()
