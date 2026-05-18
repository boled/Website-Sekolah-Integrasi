# Sistem Informasi Sekolah (Web & Admin Dashboard)

Sistem Informasi Sekolah ini adalah aplikasi web lengkap yang dibangun menggunakan **React (Vite + TypeScript + Tailwind CSS)** untuk bagian frontend dan terintegrasi dengan **Google Apps Script & Google Sheets** sebagai database/backend alternatif yang ringan, aman, dan mudah dikelola.

Aplikasi ini mencakup halaman publik untuk informasi sekolah dan **Dashboard Admin** yang aman (dilengkapi kontrol sesi berupa sistem Custom Token yang divalidasi ke Google Sheets) untuk mengelola semua konten.

## 🚀 Fitur Utama

### 1. Halaman Publik
- **Beranda**: Menampilkan gambaran umum, berita terbaru, dan informasi penting.
- **Profil**: Informasi profil sekolah, visi, misi, dan sejarah singkat sekolah.
- **Berita**: Halaman portal berita/artikel seputar kegiatan sekolah.
- **Guru**: Daftar profil tenaga pendidik dan kependidikan.
- **Fasilitas**: Galeri dan informasi fasilitas ruang/infrastruktur sekolah.
- **PPDB online**: Formulir Pendaftaran Peserta Didik Baru terintegrasi, yang mana hasil input langsung terekam ke database secara *real-time*.

### 2. Dashboard Admin (Secured/Aman)
- **Otentikasi & Keamanan**: Login aman menggunakan manajemen token. Menggunakan session control yang memiliki durasi masa aktif (kedaluwarsa dalam 24 jam) yang tercatat dan rajin dibersihkan sistem di dalam Spreadsheet `AdminSessions`.
- **Pengaturan Global**: Manajemen pengaturan sekolah secara terpusat. Mengubah Nama Sekolah, Logo URL, Narasi Profil/Sejarah, Visi Misi, Alamat, dan Kontak Web. Semua tercermin otomatis ke area Publik.
- **Kelola Berita**: Fitur CRUD (Create, Read, Update, Delete) portal artikel berita.
- **Kelola Guru**: Fitur CRUD manajemen profil guru.
- **Kelola Fasilitas (Integrasi Google Drive)**: Form CRUD canggih yang mendukung upload foto/multiple foto gallery secara live ke *Google Drive* serta dapat melakukan pengurutan gambar (Move Up/Move Down).
- **Kelola PPDB**: Fitur yang sangat memudahkan Panita Penerimaan Siswa Baru dalam memantau pendaftar secara online/real-time (Terdapat fungsi edit/delete untuk maintenance data invalid).

## 💻 Teknologi

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React (Icons), React Router v7.
- **Backend/Database**: Google Apps Script (GAS) dan Google Sheets API (Berfungsi layaknya REST API backend, dan Excel ber-fungsi sebagai basis data / DBMS nya).
- **Storage System**: Google Drive API (Menyimpan Media / File foto form hasil upload admin secara base64 conversion).

## 🛠 Panduan Instalasi & Penggunaan

Aplikasi frontend ini membutuhkan akses ke **Google Apps Script Web App** agar berjalan baik.

1. Buka folder `/apps-script/Code.gs` di sistem proyek.
2. Salin seluruh kodenya.
3. Buka [Google Apps Script Dashboard](https://script.google.com/) dan buat Project Baru.
4. Paste *(Timpa kode `myFunction` default)* dengan seluruh kode yang disalin sebelumnya.
5. Klik **Run** (Jalankan) pada fungsi `initializeSheets()` untuk membuat basis *Spreadsheet* dan penamaan *Header Baris* yang diperlukan. Berikan izin otorisasi saat Google memintanya. 
6. Buka Google Sheet yang dihasilkan untuk melihat Sheet otomatis seperti: `Pengaturan`, `Berita`, `Guru`, `Fasilitas`, `PPDB`, `AdminUsers`, dan `AdminSessions`. (Akses default admin adalah `admin` / `admin123`).
7. Klik **Deploy** (Terapkan) -> **New deployment** (Penerapan baru).
8. Pilih tipe: **Web app**.
9. Atur "Who has access" / "Siapa yang memiliki akses" menjadi: **Anyone** (Semua orang). Ini WAJIB agar website tidak memunculkan masalah CORS Policy.
10. Terapkan deploy dan salin **Web app URL** yang muncul.
11. Buka file konfigurasi `.env` pada web, dan atur *Value* (Nilai) sesuai environment: `VITE_GAS_API_URL="URL_TERSEBUT"`

Maka Dashboard siap dikelola!. Mulai tambahkan data dummy dari Menu Admin dan lihat keajaibannya di halaman utama!.

---

## ✍️ Kredit & Dukungan

Supported by:
**[Abyfine Intermedia](https://abyfine.com)**
