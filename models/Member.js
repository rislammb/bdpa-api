const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
  committeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Committee',
    required: [true, 'Committee ID is required!'],
  },
  pharmacistId: {
    type: Schema.Types.ObjectId,
    ref: 'Pharmacist',
    required: [true, 'Pharmacist ID is required!'],
  },
  serialNumber: {
    name: { type: String, default: '', maxLength: 15 },
    bn_name: { type: String, default: '', maxLength: 15 },
  },
  postName: {
    name: {
      type: String,
      trim: true,
      maxLength: 45,
    },
    bn_name: {
      type: String,
      trim: true,
      maxLength: 45,
    },
  },
});

const Member = model('Member', memberSchema);
module.exports = Member;
