const { model, Schema } = require('mongoose');

const pharmacistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    maxLength: 45,
  },
  bn_name: { type: String, default: '', trim: true, maxLength: 45 },
  fathersName: {
    name: {
      type: String,
      default: '',
      trim: true,
      uppercase: true,
      maxLength: 45,
    },
    bn_name: { type: String, default: '', trim: true, maxLength: 45 },
  },
  mothersName: {
    name: {
      type: String,
      default: '',
      trim: true,
      uppercase: true,
      maxLength: 45,
    },
    bn_name: { type: String, default: '', trim: true, maxLength: 45 },
  },
  email: { type: String, default: '', trim: true, maxLength: 35 },
  mobile: {
    name: { type: String, default: '', trim: true, maxLength: 35 },
    bn_name: { type: String, default: '', trim: true, maxLength: 35 },
  },
  mainImageUrl: { type: String, default: '', maxLength: 550 },
  imageUrl: { type: String, default: '', maxLength: 550 },
  dateOfBirth: { type: Date },
  gender: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', trim: true, maxLength: 45 },
    bn_name: { type: String, default: '', trim: true, maxLength: 45 },
  },
  nationalId: {
    name: { type: String, trim: true, default: '', maxLength: 45 },
    bn_name: { type: String, trim: true, default: '', maxLength: 45 },
  },
  institute: {
    name: { type: String, default: '', trim: true, maxLength: 90 },
    bn_name: { type: String, default: '', trim: true, maxLength: 90 },
  },
  passingYear: {
    name: { type: String, default: '', trim: true, maxLength: 4 },
    bn_name: { type: String, default: '', trim: true, maxLength: 4 },
  },
  regNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxLength: 15,
  },
  memberId: {
    type: String,
    trim: true,
    default: '',
    unique: true,
    maxLength: 15,
  },
  dateOfJoin: { type: Date },
  jobDepertment: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', trim: true, maxLength: 90 },
    bn_name: { type: String, default: '', trim: true, maxLength: 90 },
  },
  postingDivision: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  postingDistrict: {
    id: { type: String, default: '', maxLength: 45 },
    division_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  postingUpazila: {
    id: { type: String, default: '', maxLength: 45 },
    district_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  postingPlace: {
    name: { type: String, default: '', trim: true, maxLength: 90 },
    bn_name: { type: String, default: '', trim: true, maxLength: 90 },
  },
  permanentDivision: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  permanentDistrict: {
    id: { type: String, default: '', maxLength: 45 },
    division_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  permanentUpazila: {
    id: { type: String, default: '', maxLength: 45 },
    district_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  permanentPlace: {
    name: { type: String, default: '', trim: true, maxLength: 90 },
    bn_name: { type: String, default: '', trim: true, maxLength: 90 },
  },
  voterDivision: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  voterDistrict: {
    id: { type: String, default: '', maxLength: 45 },
    division_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  onDeputation: {
    id: { type: String, default: '1', maxLength: 45 },
    name: { type: String, default: 'No', maxLength: 45 },
    bn_name: { type: String, default: 'না', maxLength: 45 },
  },
  deputationDivision: {
    id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  deputationDistrict: {
    id: { type: String, default: '', maxLength: 45 },
    division_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  deputationUpazila: {
    id: { type: String, default: '', maxLength: 45 },
    district_id: { type: String, default: '', maxLength: 45 },
    name: { type: String, default: '', maxLength: 45 },
    bn_name: { type: String, default: '', maxLength: 45 },
  },
  deputationPlace: {
    name: { type: String, default: '', trim: true, maxLength: 90 },
    bn_name: { type: String, default: '', trim: true, maxLength: 90 },
  },
});

const Pharmacist = model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;
