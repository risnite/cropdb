const db = require('../../config/db.js');

module.exports = {
  kota: {
    index: (req, res) => {
      const kode = req.body.kode;
      db.query(`SELECT * FROM wilayah WHERE LENGTH(kode)=5`, (err, results) => {
        if (err) throw error
        res.send(results)
      })
    },
    show: (req, res) => {
      const kode = req.body.kode;
      db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=5`, (err, results) => {
        if (err) throw error
        res.send(results)
      })
    },
  },
  kecamatan: (req, res) => {
    const kode = req.body.kode;
    db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=8`, (err, results) => {
      if (err) throw error
      res.send(results)
    })
  },
  kelurahan: (req, res) => {
    const kode = req.body.kode;
    db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=13`, (err, results) => {
      if (err) throw error
      res.send(results)
    })
  },
  get: (req, res) => {
    const kode = req.body.kode;
    console.log(kode);
    if (kode.length == 2) {
      db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=5`, (err, results) => {
        if (err) throw error
        res.send({ kota: results })
      })
    }
    if (kode.length == 5) {
      db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=8`, (err, results) => {
        if (err) throw error
        res.send({ kecamatan: results })
      })
    }
    if (kode.length == 8) {
      db.query(`SELECT * FROM wilayah WHERE kode LIKE '${kode}%' AND LENGTH(kode)=13`, (err, results) => {
        if (err) throw error
        res.send({ kelurahan: results })
      })
    }
  },
}