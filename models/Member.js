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
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  postName: {
    name: {
      type: String,
      required: [true, 'Committee post name is required!'],
      trim: true,
    },
    bn_name: {
      type: String,
      required: [true, 'Committee post name is required!'],
      trim: true,
    },
  },
});

const Member = model('Member', memberSchema);
module.exports = Member;
