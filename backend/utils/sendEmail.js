const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: 'servifind2023@gmail.com',
                pass: 'koigyzkpyogjmarm'
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email sent Successfully");;

    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
}


// const sendEmail = async options => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.PASSWORD
//         }
//     });

//     const message = {
//         from: `${process.env.FROM_NAME} <${process.env.EMAIL}>`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         html: options.html
//     }

//     await transporter.sendMail(message)
// }

// module.exports = sendEmail;