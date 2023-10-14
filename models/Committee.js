const { Schema, model, default: mongoose } = require('mongoose');

const committeeSchema = new Schema({
  committeeTitle: {
    name: { type: String, required: true, trim: true },
    bn_name: { type: String, required: true, trim: true },
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
      type: mongoose.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member ID is required!'],
    },
  ],
});

const Committee = model('Committee', committeeSchema);
module.exports = Committee;
