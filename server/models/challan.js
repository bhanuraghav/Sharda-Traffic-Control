const mongoose = require('mongoose');

const challanSchema = mongoose.Schema({
    challanNumber: String,
    challanAmount: Number,
    challanType: String,
    licenceNo: String,
    paymentDone: Boolean,
    challanDate : String
})
//String change krni hai

module.exports = mongoose.model('challans',challanSchema);