const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const TokenModel = require("../models/tokenModel");
const jwt = require("jsonwebtoken");

class AppointmentController {
  async create(req, res) {
    try {
      const { data, complaint, doctor, price } = req.body;

      const token = req.header("auth-token");
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      if (!decoded.email) {
        return res
          .status(400)
          .send({ error: "Email not found in the request body" });
      }
      const user = await User.findOne({ email: decoded.email });

      if (!user) return res.status(400).send({ error: "User not found" });
      if (user.balance < price)
        return res.status(400).send({ error: "Not enough balance" });

      user.balance -= price;
      await user.save();

      const appointment = await Appointment.create({
        data: Date.now(),
        complaint,
        doctor,
        price,
        user: user._email,
      });

      return res.send({ appointment });
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = new AppointmentController();
