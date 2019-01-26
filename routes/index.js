var express = require('express');
var router = express.Router();

router.use('/',require('./home'));
router.use('/users', require('./authenticate'));
router.use('/paychallan', require('./payumoney'));



module.exports = router;