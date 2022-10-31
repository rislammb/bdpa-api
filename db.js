const mongoose = require('mongoose');

const connectDB = (connectionStr) => {
  return mongoose.connect(connectionStr);
};

module.exports = connectDB;
