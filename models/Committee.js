const { Schema, model } = require('mongoose');

const committeeSchema = new Schema({
  committeeTitle: {
    type: String,
    required: true,
    trim: true,
  },
  committeePath: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  indexNumber: {
    type: String,
    default: '',
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
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member ID is required!'],
    },
  ],
});

const Committee = model('Committee', committeeSchema);
module.exports = Committee;
