const db = require('../config/db');

// Mendapatkan semua transaksi
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM transaksi ORDER BY created_at DESC LIMIT 25');
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

    //LOGIKA TRANSAKSI LAMA
    // for (const item of detailItems) {
    //   const { barang_id, jumlah, harga } = item;
    //   await conn.query(
    //     'INSERT INTO transaksi_detail (transaksi_id, barang_id, jumlah, harga) VALUES (?, ?, ?, ?)',
    //     [transaksiId, barang_id, jumlah, harga]
    //   );

    //   // Update stok barang
    //   if (jenis === 'masuk') {
    //     await conn.query('UPDATE barang SET stok = stok + ? WHERE id = ?', [jumlah, barang_id]);
    //   } else if (jenis === 'keluar') {
    //     await conn.query('UPDATE barang SET stok = stok - ? WHERE id = ?', [jumlah, barang_id]);
    //   }
    // }

    //LOGIKA TRANSAKSI BARU
    for (const item of detailItems) {
  const { barang_id, jumlah, harga } = item;

  // 1. Jika keluar, cek stok dulu
  if (jenis === 'keluar') {
    const [[barang]] = await conn.query('SELECT stok FROM barang WHERE id = ?', [barang_id]);
    if (!barang) throw new Error(`Barang dengan ID ${barang_id} tidak ditemukan`);
    if (barang.stok < jumlah) {
      throw new Error(`Stok tidak mencukupi untuk barang ID ${barang_id}`);
    }
  }

  // 2. Simpan detail transaksi
  await conn.query(
    'INSERT INTO transaksi_detail (transaksi_id, barang_id, jumlah, harga) VALUES (?, ?, ?, ?)',
    [transaksiId, barang_id, jumlah, harga]
  );

  // 3. Update stok
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


// export seluruh transaksi ke exel
exports.exportTransaksi = async () => {
const [rows] = await db.execute(`
      SELECT 
        t.id AS transaksi_id,
        t.jenis,
        t.keterangan,
        t.created_at,
        t.total,
        b.nama AS nama_barang,
        td.jumlah,
        td.harga
      FROM transaksi t
      JOIN transaksi_detail td ON t.id = td.transaksi_id
      JOIN barang b ON td.barang_id = b.id
      ORDER BY t.created_at DESC
    `);

    return rows
}


//export transaksi masuk ke exel
exports.exportTransaksiMasuk = async () => {
const [rows] = await db.execute(`
      SELECT 
        t.id AS transaksi_id,
        t.jenis,
        t.keterangan,
        t.created_at,
        t.total,
        b.nama AS nama_barang,
        td.jumlah,
        td.harga
      FROM transaksi t
      JOIN transaksi_detail td ON t.id = td.transaksi_id
      JOIN barang b ON td.barang_id = b.id
      WHERE t.jenis = 'masuk'
      ORDER BY t.created_at DESC
    `);
    
    return rows
}


//export transaksi keluar ke exel
exports.exportTransaksiKeluar = async () => {
const [rows] = await db.execute(`
      SELECT 
        t.id AS transaksi_id,
        t.jenis,
        t.keterangan,
        t.created_at,
        t.total,
        b.nama AS nama_barang,
        td.jumlah,
        td.harga
      FROM transaksi t
      JOIN transaksi_detail td ON t.id = td.transaksi_id
      JOIN barang b ON td.barang_id = b.id
      WHERE t.jenis = 'keluar'
      ORDER BY t.created_at DESC
    `);

    return rows
}