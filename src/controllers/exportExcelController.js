// controllers/exportController.js
const ExcelJS = require('exceljs');
const barangModel = require('../models/barangModel');
const transaksiModel = require('../models/transaksiModel');

//export barang
exports.exportBarangToExcel = async (req, res) => {
  try {
    const barangList = await barangModel.getAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Barang');

    // Header
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Nama', key: 'nama', width: 25 },
      { header: 'Deskripsi', key: 'deskripsi', width: 50 },
      { header: 'Stok', key: 'stok', width: 5 },
      { header: 'Dibuat', key: 'created_at', width: 15 },
      { header: 'DiUpdate', key: 'updated_at', width: 15 },
      { header: 'Gambar', key: 'gambar', width: 20 },
      { header: 'Harga', key: 'harga', width: 10 },
      { header: 'Kategori', key: 'kategori', width: 10 }
    ];

    // Data
    barangList.forEach(barang => {
      worksheet.addRow(barang);
    });

    // Response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=barang.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Gagal export Excel:', error);
    res.status(500).json({ message: 'Gagal export Excel' });
  }
};


//export seluruh transaksi ke excel
exports.exportTransaksiToExcel = async (req, res) => {
  try {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Transaksi');
    const resaults = await transaksiModel.exportTransaksi();

    worksheet.columns = [
      { header: 'ID Transaksi', key: 'transaksi_id', width: 15 },
      { header: 'Tanggal', key: 'created_at', width: 20 },
      { header: 'Jenis', key: 'jenis', width: 10 },
      { header: 'Keterangan', key: 'keterangan', width: 30 },
      { header: 'Nama Barang', key: 'nama_barang', width: 25 },
      { header: 'Jumlah', key: 'jumlah', width: 10 },
      { header: 'Harga', key: 'harga', width: 15 },
      { header: 'Total Transaksi', key: 'total', width: 20 },
    ];

    resaults.forEach(row => {
      worksheet.addRow({
        transaksi_id: row.transaksi_id,
        created_at: new Date(row.created_at),
        jenis: row.jenis,
        keterangan: row.keterangan,
        nama_barang: row.nama_barang,
        jumlah: row.jumlah,
        harga: row.harga,
        total: row.total
      });
    });

    worksheet.getColumn('created_at').numFmt = 'yyyy-mm-dd hh:mm:ss';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=transaksi.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Gagal mengekspor data transaksi:', err);
    res.status(500).send('Terjadi kesalahan saat ekspor');
  }
};

//export transaksi masuk ke excel
exports.exportTransaksiMasukToExcel = async (req, res) => {
  
    try {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transaksi Masuk');
    const resaults = await transaksiModel.exportTransaksiMasuk();

    worksheet.columns = [
      { header: 'ID Transaksi', key: 'transaksi_id', width: 15 },
      { header: 'Tanggal', key: 'created_at', width: 20 },
      { header: 'Keterangan', key: 'keterangan', width: 30 },
      { header: 'Nama Barang', key: 'nama_barang', width: 25 },
      { header: 'Jumlah', key: 'jumlah', width: 10 },
      { header: 'Harga', key: 'harga', width: 15 },
      { header: 'Total Transaksi', key: 'total', width: 20 },
    ];

    resaults.forEach(row => {
      worksheet.addRow({
        transaksi_id: row.transaksi_id,
        created_at: new Date(row.created_at),
        keterangan: row.keterangan,
        nama_barang: row.nama_barang,
        jumlah: row.jumlah,
        harga: row.harga,
        total: row.total
      });
    });

    worksheet.getColumn('created_at').numFmt = 'yyyy-mm-dd hh:mm:ss';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=transaksi_masuk.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Gagal ekspor transaksi masuk:', err);
    res.status(500).send('Terjadi kesalahan saat ekspor');
  }
};

//export transaksi keluar keexcel
exports.exportTransaksiKeluarToExcel = async (req, res) => {
  
    try {
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transaksi Masuk');
    const resaults = await transaksiModel.exportTransaksiKeluar();

    worksheet.columns = [
      { header: 'ID Transaksi', key: 'transaksi_id', width: 15 },
      { header: 'Tanggal', key: 'created_at', width: 20 },
      { header: 'Keterangan', key: 'keterangan', width: 30 },
      { header: 'Nama Barang', key: 'nama_barang', width: 25 },
      { header: 'Jumlah', key: 'jumlah', width: 10 },
      { header: 'Harga', key: 'harga', width: 15 },
      { header: 'Total Transaksi', key: 'total', width: 20 },
    ];

    resaults.forEach(row => {
      worksheet.addRow({
        transaksi_id: row.transaksi_id,
        created_at: new Date(row.created_at),
        keterangan: row.keterangan,
        nama_barang: row.nama_barang,
        jumlah: row.jumlah,
        harga: row.harga,
        total: row.total
      });
    });

    worksheet.getColumn('created_at').numFmt = 'yyyy-mm-dd hh:mm:ss';

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=transaksi_keluar.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Gagal ekspor transaksi keluar:', err);
    res.status(500).send('Terjadi kesalahan saat ekspor');
  }
};