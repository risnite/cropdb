const express = require('express');
const router = express.Router()

const wilayahController = require('../../controllers/api/wilayah-api-controller.js');
router.get('/kota', wilayahController.kota.index)
router.post('/kota', wilayahController.kota.show)
router.post('/kecamatan', wilayahController.kecamatan)
router.post('/kelurahan', wilayahController.kelurahan)

module.exports = router