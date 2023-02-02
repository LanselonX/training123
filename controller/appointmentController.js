const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const TokenModel = require("../models/tokenModel");
const jwt = require("jsonwebtoken");

class AppointmentController {
  async create(req, res) {
    try {
      const { data, time, complaint, doctor, price } = req.body;

      const token = req.header("auth-token");
      if (!token) {
        return res.status(401).send({ error: "Access denied" });
      }
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const userId = decoded._id;

      const user = await User.findById(userId);
      if (!user) return res.status(400).send({ error: "User not found" });
      if (user.balance < price)
        return res.status(400).send({ error: "Not enough balance" });

      user.balance -= price;
      await user.save();

      const appointment = await Appointment.create({
        data,
        time,
        complaint,
        doctor,
        price,
        user: userId,
      });

      return res.send({ appointment });
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = new AppointmentController();
