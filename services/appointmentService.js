const appointmentController = require("../controller/appointmentController");

const appointmentService = {
  create: (req, res) => appointmentController.create(req, res),
};

module.exports = appointmentService;
