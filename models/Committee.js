const { Schema, model, default: mongoose } = require('mongoose');

const committeeSchema = new Schema({
  committeeTitle: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    maxLength: 90,
  },
  bn_committeeTitle: {
    type: String,
    trim: true,
    minLength: 7,
    maxLength: 90,
  },
  committeePath: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 7,
    maxLength: 90,
  },
  indexNumber: {
    name: { type: String, default: '', maxLength: 15 },
    bn_name: { type: String, default: '', maxLength: 15 },
  },
  workHasStarted: {
    type: Date,
    default: null,
  },
  willExpire: {
    type: Date,
    default: null,
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member ID is required!'],
    },
  ],
});

const Committee = model('Committee', committeeSchema);
module.exports = Committee;
