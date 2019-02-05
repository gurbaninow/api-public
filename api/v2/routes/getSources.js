import { Sources } from '@shabados/database'

/**
 * Gets all the DB sources.
 */
const getSources = () => Sources.query()

export default getSources
