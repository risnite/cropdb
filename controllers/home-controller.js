const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

module.exports = {
  index:
    (req, res) => {
      // get all provinsi
      connection.query('SELECT * FROM wilayah WHERE LENGTH(kode)=2; SELECT * FROM wilayah WHERE LENGTH(kode)=5; SELECT * FROM bank', (err, results) => {
        if (err) throw error
        // console.log('home-controller:');
        const provinsi = results[0];
        const kota = results[1];
        const bank = results[2];
        // console.log('provinsi: ');
        // console.log(provinsi);
        // console.log('kota: ');
        // console.log(kota);
        res.render("home", { title: 'Home', provinsi: provinsi, kota: kota, bank: bank })
      })
    },
  create:
    (req, res) => {
      console.log('home-controller-create:');
      console.log(req.body);
    }
}