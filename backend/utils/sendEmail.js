const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;