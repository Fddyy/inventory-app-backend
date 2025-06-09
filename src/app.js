const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// import routes
const userRoute = require('./routes/userRoute');
const barangRoute = require('./routes/barangRoute');
const searchRoute = require('./routes/searchRoute')
const transaksiRoute = require('./routes/transaksiRoute')
const dashboardRoutes = require('./routes/dashboardRoute');
const exportBarangExcelRoute = require('./routes/exportBarangExcelRoute')
const exportTransaksiExcelRoute = require('./routes/exportTransaksiExcelRoute')
const exportTransaksiMasukRoute = require('./routes/exportTransaksiMasukRoute')
const exportTransaksiKeluarRoute = require('./routes/exportTransaksiKeluarRoute')
const cetakQRroute = require('./routes/cetakqrRoute')

require("dotenv").config();

app.use(cors({
  // origin: 'http://localhost:5500',
  credentials: true             
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', userRoute);
app.use('/dashboard', dashboardRoutes);
app.use('/search', searchRoute)
app.use('/barang', barangRoute)
app.use('/transaksi', transaksiRoute)
app.use('/export/barang', exportBarangExcelRoute)
app.use('/export/transaksi', exportTransaksiExcelRoute)
app.use('/export/transaksi-masuk', exportTransaksiMasukRoute)
app.use('/export/transaksi-keluar', exportTransaksiKeluarRoute)
app.use('/cetak-qr', cetakQRroute)


module.exports = app;