import { readJSON, remove, move } from 'fs-extra'
import { manifest, extract } from 'pacote'
import importFresh from 'import-fresh'
import { knex } from '@shabados/database'

import { dependencies } from './package.json'

const databasePackage = `@shabados/database@${dependencies[ '@shabados/database' ]}`

// Check every 5 minutes for updates
const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000
const UPDATE_TMP_FOLDER = 'temp'

/**
 * Determines whether the database is the latest version, according to semver.
 * @async
 * @returns {boolean} Whether or not the latest database is installed.
 */
export const isLatestDatabase = async () => {
  // Read package.json database semver and database package file
  const [ remotePackage, localPackage ] = await Promise.all( [
    manifest( databasePackage ),
    readJSON( 'node_modules/@shabados/database/package.json', 'utf-8' ),
  ] )

  console.log( 'Local Database Version:', localPackage.version )
  console.log( 'Remote Database Version:', remotePackage.version )

  return localPackage.version === remotePackage.version
}

/**
 * Downloads the latest version of the database, according to semver.
 * Hot-reloads the data only.
 * ! Code will not be hot-reloaded, and code updates require a restart.
 * @async
 */
export const updateDatabase = async () => {
  // Download and extract the database package from npm
  console.log( `Downloading database update to ${UPDATE_TMP_FOLDER}` )
  await remove( UPDATE_TMP_FOLDER )
  await extract( databasePackage, UPDATE_TMP_FOLDER )

  console.log( 'Hot-patching database module...' )
  // Disconnect the Shabad OS database connection
  await knex.destroy()
  // Move across the updated npm database module
  await move( UPDATE_TMP_FOLDER, 'node_modules/@shabados/database', { overwrite: true } )
  // Reimport the database
  //! Relies on knex being reinitialised globally
  importFresh( '@shabados/database' )
  // TODO: Add CloudFlare purge cache
}

/**
 * Checks for database updates, according to semver, and updates if there are.
 * @async
 */
export const checkUpdates = async () => {
  console.log( `Checking for database updates satisfying ${databasePackage}` )

  // Exit if there aren't any updates
  if ( await isLatestDatabase() ) {
    console.log( 'No database updates available.' )
    return
  }

  await updateDatabase()
  console.log( 'Database successfully updated.' )
}

/**
 * Provides a recursive update checking function.
 * Checks for updates at constant interval.
 */
const updateLoop = async () => {
  await checkUpdates()
  setTimeout( updateLoop, UPDATE_CHECK_INTERVAL )
}

export default updateLoop
