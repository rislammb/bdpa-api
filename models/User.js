const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is invalid email!`,
      },
    },
    password: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    accountStatus: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'SUSPEND', 'REJECTED'],
      default: 'PENDING',
      required: true,
    },
    roles: {
      type: [String],
      default: ['USER'], // SUPER_ADMIN, ADMIN, DISTRICT_ADMIN, USER
      required: true,
    },
    adminDetails: {
      id: { type: String, default: '' },
      name: { type: String, default: '' },
      nameBengali: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
