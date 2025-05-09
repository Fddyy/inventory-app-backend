const transaksiModel = require('../models/transaksiModel');

exports.createTransaksi = async (req, res) => {
  try {
    const { jenis, keterangan, detail } = req.body;

    if (!jenis || !['masuk', 'keluar'].includes(jenis)) {
      return res.status(400).json({ message: 'Jenis transaksi tidak valid' });
    }

    if (!Array.isArray(detail) || detail.length === 0) {
      return res.status(400).json({ message: 'Detail transaksi harus diisi' });
    }

    // Hitung total harga
    const total = detail.reduce((acc, item) => acc + (item.harga * item.jumlah), 0);
    //console.log(detail)

    const transaksiId = await transaksiModel.create({ jenis, keterangan, total }, detail);
    res.status(201).json({ message: 'Transaksi berhasil dibuat', transaksiId });
  } catch (error) {
    console.error('Gagal membuat transaksi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat membuat transaksi' });
  }
};

exports.getAllTransaksi = async (req, res) => {
  try {
    const data = await transaksiModel.getAll();
    res.json(data);
  } catch (error) {
    console.error('Gagal mengambil transaksi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
  }
};

exports.getTransaksiById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaksi = await transaksiModel.getById(id);
    const detail = await transaksiModel.getDetailByTransaksiId(id);

    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
    }

    res.json({ transaksi, detail });
  } catch (error) {
    console.error('Gagal mengambil transaksi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
  }
};
