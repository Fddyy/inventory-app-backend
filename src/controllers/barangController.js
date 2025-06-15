const barangModel = require('../models/barangModel');
const QRCode = require('qrcode');

exports.getAllBarang = async (req, res) => {
  try {
    const barang = await barangModel.getAll();
    res.status(200).json(barang);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data barang.' });
  }
};

exports.getNewBarang = async (req, res) => {
  try {
    const barang = await barangModel.getNew();
    res.status(200).json(barang);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data barang.' });
  }
};


exports.getBarangById = async (req, res) => {
  const { id } = req.params;
  try {
    const barang = await barangModel.getById(id);
    if (!barang) {
      return res.status(404).json({ message: 'Barang tidak ditemukan.' });
    }
    res.status(200).json(barang);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data barang.' });
  }
};


// Menambahkan barang baru
exports.createBarang = async (req, res) => {
  const { nama, deskripsi, stok, gambar, harga, kategori } = req.body;
  
  if (!nama || !stok || !harga || !kategori) {
    return res.status(400).json({ message: 'Nama, stok, harga, dan kategori harus diisi.' });
  }

  try {
    const existing = await barangModel.getByNama(nama);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Nama barang sudah digunakan.' });
    }

    const data = { nama, deskripsi, stok, gambar, harga, kategori };
    const result = await barangModel.create(data);
    // console.log(result)

    res.status(201).json({
      message: 'Barang berhasil ditambahkan.',
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan barang.' });
  }
};

exports.updateBarang = async (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, stok, gambar, harga, kategori } = req.body;

  if (!nama || stok == null || !harga || !kategori) {
    return res.status(400).json({ message: 'Nama, stok, harga, dan kategori harus diisi.' });
  }

  try {
    const data = { nama, deskripsi, stok, gambar, harga, kategori };
    await barangModel.update(id, data);
    res.status(200).json({ message: 'Barang berhasil diperbarui.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui barang.' });
  }
};

// Menghapus barang berdasarkan ID
exports.deleteBarang = async (req, res) => {
  const { id } = req.params;
  try {
    await barangModel.delete(id);
    res.status(200).json({ message: 'Barang berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus barang.' });
  }
};


//pencarian barang berdasarkan naama scr realtime
exports.searchBarang = async (req, res) => {
  const keyword = req.query.keyword;
  // console.log('keyword' + keyword)

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword harus diisi' });
  }

  try {
    const results = await barangModel.searchByName(keyword);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Tidak ada barang yang cocok' });
    }

    res.json(results);
    // console.log('Hasil pencarian:', results);
  } catch (error) {
    console.error('Gagal mencari barang:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mencari barang' });
  }
};
