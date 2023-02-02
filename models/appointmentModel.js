const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  data: { type: Date, required: true },
  time: { type: Date, required: true },
  complaint: { type: String },
  doctor: { type: String },
  price: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Appointment", AppointmentSchema);
