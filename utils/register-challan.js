const challanController = require('../controllers/challanController');
const {sendMail} = require('./send-mail');
const {sendSMS} = require('./send-sms');

const {runModel} = require('../ML/runMLModel.js');

const registerChallan = async () => {
	const numberPlate = await runModel();
	// console.log(numberPlate);
    const data = await challanController.createChallan(numberPlate);
    console.log(data);
    let returnData = {
    	data: data,
    	mailDetails: await sendMail(data),
    	smsDetails: await sendSMS(data)
    }
    return returnData;
}

module.exports = {
    registerChallan
}
