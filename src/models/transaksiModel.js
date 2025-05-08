const db = require('../config/db');

// Mendapatkan semua transaksi
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM transaksi ORDER BY created_at DESC');
  return rows;
};

// Mendapatkan transaksi berdasarkan ID
exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM transaksi WHERE id = ?', [id]);
  return rows[0];
};

// Mendapatkan detail transaksi berdasarkan ID transaksi
exports.getDetailByTransaksiId = async (transaksiId) => {
  const [rows] = await db.query(
    `SELECT td.*, b.nama 
     FROM transaksi_detail td 
     JOIN barang b ON td.barang_id = b.id 
     WHERE td.transaksi_id = ?`,
    [transaksiId]
  );
  return rows;
};

// Membuat transaksi dan detailnya
exports.create = async (transaksiData, detailItems) => {
  const { jenis, keterangan, total } = transaksiData;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [transaksiResult] = await conn.query(
      'INSERT INTO transaksi (jenis, keterangan, total) VALUES (?, ?, ?)',
      [jenis, keterangan,total]
    );
    const transaksiId = transaksiResult.insertId;

    for (const item of detailItems) {
      const { barang_id, jumlah, harga } = item;
      await conn.query(
        'INSERT INTO transaksi_detail (transaksi_id, barang_id, jumlah, harga) VALUES (?, ?, ?, ?)',
        [transaksiId, barang_id, jumlah, harga]
      );

      // Update stok barang
      if (jenis === 'masuk') {
        await conn.query('UPDATE barang SET stok = stok + ? WHERE id = ?', [jumlah, barang_id]);
      } else if (jenis === 'keluar') {
        await conn.query('UPDATE barang SET stok = stok - ? WHERE id = ?', [jumlah, barang_id]);
      }
    }

    await conn.commit();
    return transaksiId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

// Menghapus transaksi dan detailnya
exports.delete = async (id) => {
  await db.query('DELETE FROM transaksi WHERE id = ?', [id]);
};
