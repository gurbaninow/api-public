/**
 * Response template for error
 * @param {object} req Express request obj
 * @param {object} error JavaScript Error Constructor
 * @returns {object} Formatted Error Data
 */
const errorHandler = ( { message }, { path, method, params, query }, res, next ) => (
  res.status( 400 ).json( {
    error: true,
    request: { path, method, params, query },
    message,
  } )
)

export default errorHandler
