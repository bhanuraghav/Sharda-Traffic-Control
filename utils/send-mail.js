const nodemailer = require('nodemailer');
const config =  require('../config/config');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    //host:
    secure: false,
    port: 25,
    auth: {
        //user:<mailer_email_address>
        user: `${config.EMAIL_ID}`,
        pass: `${config.EMAIL_PASSWORD}`
    },
    //when use with local host
    tls:{
        rejectUnauthorized: false 
    }
});

const sendMail = async (data) => {
    const reciever = data.userDetails.email;
    // setup email data with unicode symbols

    /*
        data = {
            userDetails: {
                name: ,
                email:
            },
            challanDetails: {
                challanNumber: ,
                licenseNo: 
            }
        }
    */

    const output = `
        <p>Hi ${data.userDetails.name},</p>
        <p>A challan with challan#${data.challanDetails.challanNumber}
        has been created for license#${data.challanDetails.licenseNo}. Kindly pay the challan at the earliest.</p>
        <p>
        Regards,
        Traffic Police,
        Contact: 40320402
        </p>
   `;
    const mailOptions = {
        //sender
        from: ` "Traffic Police" ${config.EMAIL_ID}`,
        //reciever
        to: `${reciever}`,// list of receivers

        subject: `Challan created with challan#${data.challanDetails.challanNumber} for License#${data.challanDetails.licenseNo}`,
        //test: output, // plain text body
        //html: '<b>Hello world</b>' // html body
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return Promise.reject(error);

        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log(`Email has been sent at ${reciever}`);
        return Promise.resolve(info);
    
    });
}

module.exports = {
    sendMail
}