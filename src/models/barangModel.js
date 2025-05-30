const db = require('../config/db');

// Get all barang
exports.getNew = async () => {
  const [rows] = await db.query('SELECT * FROM barang ORDER BY created_at DESC LIMIT 50');
  return rows;
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM barang');
  return rows;
};

// Get barang by ID
exports.getById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM barang WHERE id = ?', [id]);
  return rows[0];
};

exports.getByNama = async (nama) => {
  const [rows] = await db.execute('SELECT * FROM barang WHERE nama = ?', [nama]);
  return rows;
};


// Create new barang
exports.create = async (data) => {
  const { nama, deskripsi, stok, harga, kategori } = data;
  const query = 'INSERT INTO barang (nama, deskripsi, stok, harga, kategori) VALUES (?, ?, ?, ?, ?)'
  const [result] = await db.execute(query,[nama, deskripsi, stok, harga, kategori]
  );
  return result
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
    `SELECT * FROM barang WHERE nama LIKE ? LIMIT 10`,
    [`%${keyword}%`]
  );
  return rows;
};
