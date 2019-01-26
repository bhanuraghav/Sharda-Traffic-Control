const mongoose = require('mongoose')
const config = require('./../../config/config')

mongoose.Promise = global.Promise
console.log(config.MONGO_URI)
// mongoose.connect(config.MONGO_URI || process.env.MONGO_URI,{ useNewUrlParser: true })

mongoose.connect('mongodb://trafficcontrol:raghav12@ds113765.mlab.com:13765/traffic')
module.exports = {mongoose}
