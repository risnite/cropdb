// dotenv
require('dotenv').config()

// express
const express = require('express');
const app = express();
// helmet
const helmet = require("helmet");
app.use(helmet());

// set template engine
const eta = require('eta');
app.engine("eta", eta.renderFile)
if (process.env.NODE_ENV == 'development') {
  eta.configure({ views: "./views", cache: false })
}
if (process.env.NODE_ENV == 'production') {
  eta.configure({ views: "./views", cache: true })
}
app.set("views", "./views")
app.set("view cache", true)
app.set("view engine", "eta")

// static file
app.use(express.static('public'))

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routes
const web = require('./routes/web.js');
const wilayah = require('./routes/api/wilayah.js');

app.use('/', web)

// api
app.use('/api/wilayah', wilayah)
// app.get('/api', (req, res) => {
//   res.json({ users: ['Faris', 'Arif', 'Anisah'] });
// })

if (process.env.NODE_ENV == 'development') {
  const port = 5000;
  const hostname = 'localhost';
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}
