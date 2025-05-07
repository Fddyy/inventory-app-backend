const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// import routes
const userRoute = require('./routes/userRoute');
const barangRoute = require('./routes/barangRoute');

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/login', userRoute);
app.use('/barang', barangRoute)

module.exports = app;