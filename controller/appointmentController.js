// const Appointment = require("../models/appointmentModel");
// const User = require("../models/userModel");

// class AppointmentController {
//   async create(req, res) {
//     try {
//       const { data, time, complaint, doctor, price } = req.body;
//       const userId = req.user._id;

//       const user = await User.findById(userId);
//       if (!user) return res.status(400).send({ error: "User not found" });
//       if (user.balance < price)
//         return res.status(400).send({ error: "Not enough balance" });

//       user.balance -= price;
//       await user.save();

//       const appointment = await Appointment.create({
//         data,
//         time,
//         complaint,
//         doctor,
//         price,
//         // user: userId,
//       });

//       return res.send({ appointment });
//     } catch (error) {
//       return res.status(400).send({ error: "Error creating appointment" });
//     }
//   }
// }

// module.exports = new AppointmentController();
