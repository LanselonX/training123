// const appointmentModel = require("../models/appointmentModel");
// const userModel = require("../models/userModel");

// class AppointmentService {
//   async createAppointment(data, time, complaint, doctor, price) {
//     const existingAppointment = await appointmentModel.findOne({ data });
//     if (existingAppointment) {
//       throw new Error("Запись уже существует");
//     }
//     const appointment = new appointmentModel({
//       data,
//       time,
//       complaint,
//       doctor,
//       price,
//     });
//     await a();
//     return appointment;
//   }
// }
