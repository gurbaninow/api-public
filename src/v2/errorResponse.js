/**
 * Response template for error
 * @param {object} req Express request obj
 * @param {object} error JavaScript Error Constructor
 * @returns {object} Formatted Error Data
 */
const errorResponse = ( { path, method, params, query }, { message } ) => ( {
  error: true,
  request: { path, method, params, query },
  message,
} )

export default errorResponse
