const dashboardModel = require('../models/dashboardModel');

exports.getDashboardData = async (req, res) => {
  try {
    const totalStok = await dashboardModel.getTotalStok();
    const stokPerKategori = await dashboardModel.getStokPerKategori();
    const penjualanBulanan = await dashboardModel.getPenjualanBulanan();
    const masukKeluar = await dashboardModel.getBarangMasukKeluar();

    res.json({
      totalStok: totalStok?.total_stok || 0,
      stokPerKategori,
      penjualanBulanan,
      masukKeluar
    });
  } catch (error) {
    console.error('Gagal mengambil data dashboard:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data dashboard' });
  }
};
