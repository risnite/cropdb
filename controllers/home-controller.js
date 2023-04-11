const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

module.exports = {
  index:
    (req, res) => {
      // get all provinsi
      const query = 'SELECT * FROM member'
      connection.query(query, (err, results) => {
        if (err) throw error
        results.map((result) => {
          result.produk = JSON.parse(result.produk);
          result.komoditas = JSON.parse(result.komoditas);
        })
        console.log('home-controller-index:');
        console.log(results);
        results.forEach(result => {
          console.log(typeof result.produk);
          console.log(result.produk);
        });
        res.render("home", { title: 'Home', results: results })
      })
    },
  create:
    (req, res) => {
      // get all provinsi
      connection.query('SELECT * FROM wilayah WHERE LENGTH(kode)=2; SELECT * FROM wilayah WHERE LENGTH(kode)=5; SELECT * FROM bank;', (err, results) => {
        if (err) throw error
        // console.log('home-controller:');
        const provinsi = results[0];
        const kota = results[1];
        const bank = results[2];
        console.log('provinsi: ');
        console.log(provinsi);
        // console.log('kota: ');
        // console.log(kota);
        res.render("create", { layout: 'layouts/form', title: 'Home', provinsi: provinsi, kota: kota, bank: bank })
      })
    },
  store:
    (req, res) => {
      var {
        produk,
        namaLengkap,
        namaPanggilan,
        pembudidaya,
        komoditas,
        handphone,
        whatsapp,
        email,
        alamat,
        provinsi,
        kota,
        kecamatan,
        kelurahan,
        kodePos,
        koordinatDomisili,
        domisiliKtp,
        alamatKtp,
        provinsiKtp,
        kotaKtp,
        kecamatanKtp,
        kelurahanKtp,
        kodePosKtp,
        agama,
        tempatLahir,
        tglLahir,
        jenisKelamin,
        statusPerkawinan,
        pendidikan,
        noKtp,
        noKk,
        npwp,
        bank,
        rekeningBank
      } = req.body
      // set boolean value
      // if (pembudidaya == 'true') {
      //   pembudidaya = true
      // } else {
      //   pembudidaya = false
      // }

      // convert json to string 
      produk = JSON.stringify(produk);
      komoditas = JSON.stringify(komoditas);

      console.log('home-controller-create:');
      console.log(req.body);
      console.log(typeof req.body.produk);
      console.log(req.body.produk);
      const query = `
    INSERT INTO member (
      produk, 
      nama_lengkap, 
      nama_panggilan, 
      pembudidaya,
      komoditas, 
      handphone, 
      whatsapp, 
      email, 
      alamat, 
      provinsi, 
      kota, 
      kecamatan, 
      kelurahan,
      kode_pos,
      koordinat_domisili,
      domisili_ktp,
      alamat_ktp,
      provinsi_ktp,
      kota_ktp,
      kecamatan_ktp,
      kelurahan_ktp,
      kode_pos_ktp,
      agama,
      tempat_lahir,
      tgl_lahir,
      jenis_kelamin,
      status_perkawinan,
      pendidikan,
      no_ktp,
      no_kk,
      npwp,
      bank,
      rekening_bank 
    ) 
    VALUES (
      '${produk}', 
      '${namaLengkap}', 
      '${namaPanggilan}', 
      '${pembudidaya}', 
      '${komoditas}',
      '${handphone}', 
      '${whatsapp}', 
      '${email}', 
      '${alamat}', 
      '${provinsi}', 
      '${kota}', 
      '${kecamatan}', 
      '${kelurahan}',
      '${kodePos}',
      '${koordinatDomisili}',
      '${domisiliKtp}',
      '${alamatKtp}',
      '${provinsiKtp}',
      '${kotaKtp}',
      '${kecamatanKtp}',
      '${kelurahanKtp}',
      '${kodePosKtp}',
      '${agama}',
      '${tempatLahir}',
      '${tglLahir}',
      '${jenisKelamin}',
      '${statusPerkawinan}',
      '${pendidikan}',
      '${noKtp}',
      '${noKk}',
      '${npwp}',
      '${bank}',
      '${rekeningBank}' 
    );
    `
      connection.query(query, (err, results) => {
        if (err) {
          console.log(err.code);
          console.log(err.errno);
          console.log(err.fatal);
          console.log(err.sqlState);
          console.log(err.sqlMessage);
          throw error
        }
        res.send('Data Berhasil Disimpan')
      })
    },
}