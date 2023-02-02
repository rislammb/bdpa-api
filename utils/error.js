function error(msg = 'Something went wrong!', status = 500) {
  const error = new Error(msg);
  error.status = status;

  return error;
}

module.exports = error;
