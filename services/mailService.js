require("dotenv").config();
const nodemailer = require("nodemailer");
const moment = require("moment");
const appointment = require("../controller/appointmentController");

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
  }

  async sendAppointmentReminder(to, appointment) {
    const reminderTime = moment(appointment.data).subtract(1, "hour");

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Appointment Reminder",
      text: "Письмо, которое должно напоминать",
      html: `<div>
        <h1>Reminder: Your appointment is coming soon</h1>
        <p>Detalis: </p>
        <ul>
          <li>Date: ${appointment.data}</li>
        </ul>
        <p>This appointment reminder was sent ${reminderTime.fromNow()}.</p>
      </div>
      `,
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
