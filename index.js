import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import api from './src'
import errorHandler from './src/errorHandler'
import updateDB from './src/updateDB'

console.log( 'GurbaniNow API starting...' )

// Set up Express server
const app = express()
app.use( cors() )
app.use( helmet( {
  frameguard: false,
} ) )
app.use( compression() )
app.set( 'etag', 'weak' )
app.use( api )
app.use( errorHandler )

// Start Express server
console.log( 'Setting up Express...' )
const { PORT } = process.env
const port = PORT || 13131
app.listen( port, () => console.log( `Server running on port ${port}` ) )

// Start the database update loop
updateDB()
