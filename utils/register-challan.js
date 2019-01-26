const challanController = require('../controllers/challanController');
const {sendMail} = require('./send-mail');
const {sendSMS} = require('./send-sms');

const registerChallan = async (numberPlate) => {
    const data = await challanController.createChallan(numberPlate);
    sendMail(data);
    sendSMS(data);
    return data;
}

module.exports = {
    registerChallan
}