/**
 * Response template for error
 * @param {object} req Express request obj
 * @param {object} error JavaScript Error Constructor
 * @returns {object} Formatted Error Data
 */
const errorHandler = ( { message }, { method, path, query }, res, next ) => {
  res.status( 500 ).json( {
    error: true,
    request: { method, path, query },
    message,
  } )
  next()
}

export default errorHandler
