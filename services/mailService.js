'use strict';

const nodemailer = require('nodemailer');
const mailProp = require('../properties/envProperties');

const content = require('./mailContent').mailContent;

exports.sendingMails = async(emailId, firstName, lastName)=>{
    const transporter = nodemailer.createTransport({
        host: mailProp.mailHost,
        port: mailProp.mailPort,
        auth: {
            user: mailProp.mailUser,
            pass: mailProp.mailPass
        }
    })

    const name=firstName+" "+lastName;

    const send = await transporter.sendMail({
        from: mailProp.mailFrom,
        to: emailId,
        subject: "REGISTERED SUCCESSFULLY!!!!",
        html: content(name)
    })
}


