var express = require('express');
var router = express.Router();
const send = require('../middleware/SendSMS');

/* GET home page. */
router.get('/verify', send.VerifyOTP);
// router.get('/getIMG', firebase.dbFireBase);
router.get('/', send.SendSMS);
module.exports = router;
  