const db = require('../config/db');

// Get all barang
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM barang');
  return rows;
};

// Get barang by ID
exports.getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM barang WHERE id = ?', [id]);
  return rows[0];
};

// Create new barang
exports.create = async (data) => {
  const { nama, deskripsi, stok, gambar, harga, kategori } = data;
  await db.execute(
    'INSERT INTO barang (nama, deskripsi, stok, gambar, harga, kategori) VALUES (?, ?, ?, ?, ?, ?)',
    [nama, deskripsi, stok, gambar, harga, kategori]
  );
};

// Update barang by ID
exports.update = async (id, data) => {
  const { nama, deskripsi, stok, gambar, harga, kategori } = data;
  await db.execute(
    'UPDATE barang SET nama = ?, deskripsi = ?, stok = ?, gambar = ?, harga = ?, kategori = ? WHERE id = ?',
    [nama, deskripsi, stok, gambar, harga, kategori, id]
  );
};

// Delete barang by ID
exports.delete = async (id) => {
  await db.query('DELETE FROM barang WHERE id = ?', [id]);
};

//pencarian barang berdasasrkan nama scr realtime
exports.searchByName = async (keyword) => {
  const [rows] = await db.query(
    `SELECT id, nama, harga, stok FROM barang WHERE nama LIKE ? LIMIT 10`,
    [`%${keyword}%`]
  );
  return rows;
};
