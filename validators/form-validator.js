const { body, validationResult } = require('express-validator');

exports.form = [
  body('namaLengkap')
    .notEmpty()
    .withMessage('Nama lengkap harus diisi'),
  body('namaPanggilan')
    .notEmpty()
    .withMessage('Nama panggilan harus diisi'),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect('/')
      // return res.status(400).json({ errors: errors.array() });
    }
    else next();
  }
];

