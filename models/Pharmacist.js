const { model, Schema } = require('mongoose');

const pharmacistSchema = new Schema({
  name: { type: String, required: true, trim: true },
  bn_name: { type: String, default: '', trim: true },
  email: { type: String, default: '', trim: true },
  mobile: { type: String, default: '', trim: true },
  dateOfBirth: { type: Date },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  gender: { type: String, default: '', trim: true },
  passingYear: { type: String, default: '', trim: true },
  regNumber: { type: String, required: true, trim: true },
  dateOfJoin: { type: Date },
  jobDepertment: { type: String, default: '', trim: true },
  postingDivision: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  postingDistrict: {
    id: { type: String, default: '' },
    division_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  postingUpazila: {
    id: { type: String, default: '' },
    district_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  postingPlace: { type: String, default: '', trim: true },
  voterDivision: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  voterDistrict: {
    id: { type: String, default: '' },
    division_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  onDeputation: { type: String, default: 'No' },
  deputationDivision: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  deputationDistrict: {
    id: { type: String, default: '' },
    division_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  deputationUpazila: {
    id: { type: String, default: '' },
    district_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  deputationPlace: { type: String, default: '', trim: true },
});

const Pharmacist = model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
