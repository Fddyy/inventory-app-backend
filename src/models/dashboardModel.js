const db = require('../config/db');

exports.getTotalStok = async () => {
  const [rows] = await db.query('SELECT SUM(stok) AS total_stok FROM barang');
  return rows[0];
};

exports.getStokPerKategori = async () => {
  const [rows] = await db.query(`
    SELECT kategori, SUM(stok) AS total
    FROM barang
    GROUP BY kategori
  `);
  return rows;
};

exports.getPenjualanBulanan = async () => {
  const [rows] = await db.query(`
    SELECT DATE_FORMAT(created_at, '%Y-%m') AS bulan, SUM(total) AS total_penjualan
    FROM transaksi
    WHERE jenis = 'keluar'
    GROUP BY bulan
    ORDER BY bulan DESC
    LIMIT 6
  `);
  return rows.reverse();
};

exports.getBarangMasukKeluar = async () => {
  const [rows] = await db.query(`
    SELECT jenis, COUNT(*) AS jumlah
    FROM transaksi
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY jenis
  `);
  return rows;
};
