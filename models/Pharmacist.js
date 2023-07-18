const { model, Schema } = require('mongoose');

const pharmacistSchema = new Schema({
  name: { type: String, required: true, trim: true },
  bn_name: { type: String, default: '', trim: true },
  fathersName: { type: String, default: '', trim: true },
  mothersName: { type: String, default: '', trim: true },
  email: { type: String, default: '', trim: true },
  mobile: { type: String, default: '', trim: true },
  dateOfBirth: { type: Date },
  gender: { type: String, default: '', trim: true },
  nationalId: { type: String, trim: true, default: '' },
  passingYear: { type: String, default: '', trim: true },
  regNumber: { type: String, required: true, trim: true },
  memberId: { type: String, trim: true, default: '' },
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
  permanentDivision: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  permanentDistrict: {
    id: { type: String, default: '' },
    division_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  permanentUpazila: {
    id: { type: String, default: '' },
    district_id: { type: String, default: '' },
    name: { type: String, default: '' },
    bn_name: { type: String, default: '' },
  },
  permanentPlace: { type: String, default: '', trim: true },
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
