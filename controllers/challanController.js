const {Challan} = require('../server/models/challan');
const {User} = require('../server/models/users')

const createChallan = async (numberPlate) => {
    let userData = await User.findOne({numberPlate});
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
        challanNumber: toString(Date.now()),
        challanAmount: challanAmount,
        challanType: "Signal Jumping",
        licenseNo: userData.licenseNo,
        paymentDone: false
    }
    challanData = await new Challan(challanData).save();
    return {
        userDetails: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone
        },
        challanDetails: challanData
    };
}

const getAllChallans = async (licenseNo) => {
    return await Challan.find({licenseNo});
}

module.exports = {
    createChallan,
    getAllChallans
}