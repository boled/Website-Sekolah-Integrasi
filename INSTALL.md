# Panduan Instalasi Sistem Informasi Sekolah (Google Sheets & Drive)

Aplikasi ini menggunakan **Google Sheets** sebagai database utama dan **Google Drive** sebagai tempat penyimpanan aset (gambar). Aplikasi berjalan tanpa membutuhkan server database khusus.

## Langkah 1: Persiapkan Google Sheets & Drive

1. Buka [Google Drive](https://drive.google.com).
2. Buat sebuah folder baru, misalnya bernama **"Website Sekolah"**.
3. Pastikan folder ini memiliki hak akses **"Siapa saja yang memiliki link dapat melihat"** agar gambar yang disimpan di dalamnya dapat tampil di website.
4. Di dalam folder tersebut, buat file **Google Sheets** baru.

## Langkah 2: Memasang Google Apps Script (Backend API) & Auto-Setup

1. Buka file Google Sheets yang baru saja dibuat.
2. Pada menu atas, klik **Ekstensi > Apps Script**.
3. Hapus kode bawaan yang ada di editor.
4. Salin semua kode yang ada di file `apps-script/Code.gs` dari project ini, lalu tempel (*paste*) ke dalam editor Apps Script.
5. Klik ikon **Simpan** (💾).
6. **PENTING**: Pada bagian atas editor Apps Script (toolbar), pilih fungsi `setupDataSheets` dari dropdown di sebelah tombol Run (Jalankan).
7. Klik tombol **Run (Jalankan)**. Jika muncul permintaan akses (Otorisasi), klik **Tinjau Izin > Pilih Akun Google Anda > Lanjutan (Advanced) > Buka Code (Tidak aman) > Izinkan**.
   *(Langkah ini akan secara otomatis membuat dan mengatur semua sheet/tabel yang Anda butuhkan ke dalam Google Sheets).*
8. Selanjutnya, klik tombol biru **Terapkan (Deploy) > Deployment Baru (New deployment)**.
9. Di bagian "Pilih jenis", klik ikon gerigi ⚙️ dan pilih **Aplikasi Web (Web app)**.
10. Isi kolom persetujuan:
   - Deskripsi: `API Web Sekolah`
   - Jalankan sebagai: **Sistem (Me / Akun Anda)**
   - Siapa yang memiliki akses: **Siapa saja (Anyone)**
11. Klik **Terapkan (Deploy)**. Peringatan otorisasi mungkin muncul lagi, berikan akses seperti sebelumnya.
12. Akan muncul **URL Aplikasi Web**. Salin URL tersebut.

## Langkah 3: Konfigurasi Website (Front-End)

1. Buka menu **Settings/Secrets** di aplikasi web Anda (jika di-deploy melalui platform cloud) atau buka file `.env` di aplikasi lokal.
2. Cari variabel bernama `VITE_GAS_API_URL`.
3. Ganti nilainya dengan *URL Aplikasi Web* yang telah Anda salin pada langkah 2.
   ```env
   VITE_GAS_API_URL="URL_DARI_APPS_SCRIPT_ANDA"
   ```
4. Restart server website / muat ulang halaman.

## Selesai! 🎉
Website Anda kini sudah terhubung 100% dengan database Google Sheets Anda. Anda dapat mengubah konten Berita, Data Guru, dan Fasilitas dengan langsung mengetik di tabel Google Sheets. Form PPDB juga akan masuk ke tab PPDB setelah diisi oleh calon siswa.
