const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  password: { type: String, required: true },
  regNumber: { type: String, required: true },
  accountStatus: [String],
  role: [String],
  adminDetails: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    nameBengali: { type: String, default: '' },
  },
});

const User = model('User', userSchema);

module.exports = User;
