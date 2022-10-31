const nodemailer = require('nodemailer');
const { dev } = require('../config');

exports.sendResetEmail = async (email, firstName, _id, token) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: dev.app.authEmail, // generated ethereal user
                pass: dev.app.authPassword // generated ethereal password
            }
        });

        const mailOptions = {
            from: dev.app.authEmail, // sender address
            to: email, // list of receivers
            subject: 'Password Reset', // Subject line
            // text: 'Hello world?', // plain text body
            html: `<p> Welcome ${firstName}. Please click <a href="http://localhost:3000/api/v1/users/resetpassword?token=${token}">here</a> to reset your password.  </p>` // html body
        };
        // send mail with defined transport object
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: %s', info.response);
            }
        });

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
    } catch (error) {
        console.log(error);
    }
};
