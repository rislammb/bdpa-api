const mongoose = require('mongoose');

const connectDB = (connectionStr, options) => {
  return mongoose.connect(connectionStr, options);
};

module.exports = connectDB;
