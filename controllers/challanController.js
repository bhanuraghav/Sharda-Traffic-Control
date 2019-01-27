const Challan = require('../server/models/challan');
const User = require('../server/models/users')

const createChallan = async (numberPlate) => {
    let userData = await User.findOne({numberPlate});
    // console.log(userData);
    // return userData;
    let challanAmount;
    switch(userData.vehicleType){
        case "Car":
            challanAmount = 1000;
        case "Scooter":
            challanAmount = 500;
        default:
            challanAmount = 200;
    }
    let challanData = {
        challanNumber: `SIGJMP/${Date.now()}`,
        challanAmount: challanAmount,
        challanType: "Signal Jumping",
        challanDate: new Date().toString(),
        licenceNo: userData.licenceNo,
        paymentDone: false
    }
    challanData = await new Challan(challanData).save();
    let data = {
        userDetails: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone
        },
        challanDetails: challanData
    };
    data.challanDetails.licenceNo = data.userDetails
    return data;
}


module.exports = {
    createChallan
}