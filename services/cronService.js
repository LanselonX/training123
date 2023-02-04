const MailService = require("./mailService");
const cron = require("node-cron");
const moment = require("moment");
const appointmentController = require("../controller/appointmentController");

class Scheduler {
  constructor() {
    this.mailService = MailService;
  }

  startSch() {
    cron.schedule("0 0 * * *", async () => {
      const appointments =
        await appointmentController.getAppointmentsForToday();
      appointments.forEach(async (appointment) => {
        const timeDifference = momnet(appointment.data).diff(moment(), "hours");
        if (timeDifference === 1) {
          await this.mailService.sendReminderMail(
            appointment.email,
            appointment
          );
        }
      });
    });
  }
}

module.exports = new Scheduler();
