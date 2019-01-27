const config = require('../config/config')
const msg91 = require('msg91')(config.MSG91_AUTH_KEY,"TRFPOL","4");

const sendSMS = async (data) => {
    /*
        data = {
            userDetails: {
                name: ,
                phone:
            },
            challanDetails: {
                challanNumber: ,
                licenceNo: 
            }
        }
    */

   const to = data.userDetails.phone
   const text = `Hi ${data.userDetails.name},

A challan with challan# ${data.challanDetails.challanNumber} has been created for license# ${data.challanDetails.licenceNo}. Kindly pay the challan at the earliest.
Regards,
Traffic Police,
Contact: 40320402`

   msg91.send(to,text.toString(),(err,response) => {
       if(err) return Promise.reject(err);
       return Promise.resolve(response);
   })
}

module.exports = {
    sendSMS
}
