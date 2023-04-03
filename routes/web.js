const express = require('express')
const router = express.Router()

const validator = require('../validators/form-validator.js');
const homeController = require('../controllers/home-controller.js');

router.get('/', homeController.index)
router.post('/', validator.form, homeController.create)

module.exports = router