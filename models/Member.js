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
    name: { type: String, default: '', maxlength: 15 },
    bn_name: { type: String, default: '', maxlength: 15 },
  },
  postName: {
    name: {
      type: String,
      required: [true, 'Committee post name (English) is required!'],
      trim: true,
      maxlength: 45,
    },
    bn_name: {
      type: String,
      required: [true, 'Committee post name (Bengali) is required!'],
      trim: true,
      maxlength: 45,
    },
  },
});

const Member = model('Member', memberSchema);
module.exports = Member;
