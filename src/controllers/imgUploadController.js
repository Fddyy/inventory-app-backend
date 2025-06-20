exports.uploadGambar = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'File tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Upload berhasil',
      url: file.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal upload gambar' });
  }
};
