const cloudinary = require('cloudinary').v2;
var express = require('express');
var router = express.Router();

const h = require('../middleware/img')


router.post('/', h.uploadImage);

module.exports = router;
