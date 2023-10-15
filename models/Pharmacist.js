const { model, Schema } = require('mongoose');

const pharmacistSchema = new Schema({
  name: { type: String, required: true, trim: true, uppercase: true },
  bn_name: { type: String, default: '', trim: true },
  fathersName: {
    name: { type: String, default: '', trim: true, uppercase: true },
    bn_name: { type: String, default: '', trim: true },
  },
  mothersName: {
    name: { type: String, default: '', trim: true, uppercase: true },
    bn_name: { type: String, default: '', trim: true },
  },
  email: { type: String, default: '', trim: true },
  mobile: {
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
  imageUrl: { type: String, default: '', trim: true },
  dateOfBirth: { type: Date },
  gender: {
    id: { type: String, default: '' },
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
  nationalId: {
    name: { type: String, trim: true, default: '' },
    bn_name: { type: String, trim: true, default: '' },
  },
  passingYear: {
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
  regNumber: { type: String, required: true, trim: true, unique: true },
  memberId: { type: String, trim: true, default: '', unique: true },
  dateOfJoin: { type: Date },
  jobDepertment: {
    id: { type: String, default: '' },
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
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
  postingPlace: {
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
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
  permanentPlace: {
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
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
  onDeputation: {
    id: { type: String, default: '' },
    name: { type: String, default: 'No' },
    bn_name: { type: String, default: 'না' },
  },
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
  deputationPlace: {
    name: { type: String, default: '', trim: true },
    bn_name: { type: String, default: '', trim: true },
  },
});

const Pharmacist = model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
