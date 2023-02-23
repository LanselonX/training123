require("dotenv").config();
const nodemailer = require("nodemailer");
/* A library for working with dates. */
// const moment = require("moment");
const Appointment = require("../controller/appointmentController");
const cron = require("node-cron");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    cron.schedule("0 * * * *", async () => {
      const tommorow = new Date();
      tommorow.setDate(tommorow.getDate() + 1);
      const appointments = await Appointment.find({ data: { $gte: tommorow } });
      for (const appointment of appointments) {
        const user = await User.findOne({ email: appointment.user });
        if (user) {
          this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Напоминание о записи",
            text: `У вас назначена запись на ${appointment.data}. Не забудьте ее!`,
          });
        }
      }
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
          // <div>
          //   <h1>Для активации перейдите по ссылке</h1>
          //   <a href="${link}">${link}</a>
          // </div>
        `,
    });
  }
}

module.exports = new MailService();
