import app from './api'
import updateDB from './updateDB'

console.log( 'GurbaniNow API starting...' )

// Start the server
console.log( 'Setting up Express...' )
const { PORT } = process.env
const port = PORT || 13131
app.listen( port, () => console.log( `Server running on port ${port}` ) )

// Start the database update loop
updateDB()
