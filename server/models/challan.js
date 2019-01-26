const mongoose = require('mongoose');

const challanSchema = mongoose.Schema({
    challanNumber: String,
    challanAmount: Number,
    challanType: String,
    licenseNo: String,
    paymentDone: Boolean,
})

module.exports = mongoose.model('Challan',challanSchema);