var express = require('express');
var router = express.Router();
const send = require('../middleware/SendSMS');
/* GET home page. */
router.get('/', send.SendSMS);

module.exports = router;
  