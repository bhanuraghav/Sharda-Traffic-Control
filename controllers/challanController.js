const {Challan} = require('../server/models/challan');
const {User} = require('../server/models/users')

const createChallan = async (numberPlate) => {
    let userData = await User.findOne({numberPlate});
    let challanData = {
        challanNumber: toString(Date.now()),
        challanAmount: 10,
        challanType: "Signal Jumping",
        licenseNo: userData.licenseNo,
        paymentDone: false
    }
    challanData = await new Challan(challanData).save();
    return challanData;
}

const getAllChallans = async (licenseNo) => {
    return await Challan.find({licenseNo});
}

const markChallanPaid = async (challanNumber) => {
    return await Challan.findOneAndUpdate({challanNumber},{paymentStatus: true});
}

module.exports = {
    createChallan,
    getAllChallans,
    markChallanPaid
}