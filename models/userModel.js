const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  isActivated: { type: Boolean, required: false },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);
