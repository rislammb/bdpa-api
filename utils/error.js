/**
 * Create a error by string message and status code for set error
 * @param { string } msg message for set error
 * @param { number } status for set error status code
 * @returns error object
 */
function error(msg = 'Something went wrong!', status = 500) {
  const error = new Error(msg);
  error.status = status;

  return error;
}

/**
 * Create a error by error object and status code for set error
 * @param { object } obj for set error
 * @param { number } status for set error status code
 * @returns error object
 */
function jsonError(obj = {}, status = 400) {
  const error = new Error(JSON.stringify(obj), 400);
  error.status = status;

  return error;
}

module.exports = { error, jsonError };
