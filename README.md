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

## 🚀 Panduan Deployment (Hosting)

Aplikasi ini adalah Single Page Application (SPA) berbasis React dan Vite. Anda bisa meng-hosting-nya dengan mudah di berbagai platform. Sebelum melakukan *build*, pastikan Anda sudah memasukkan `VITE_GAS_API_URL` ke dalam file `.env` produksi di masing-masing platform.

### 1. Cloudflare Pages
Cara paling cepat dan direkomendasikan untuk performa maksimal:
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/), masuk ke menu **Workers & Pages**.
2. Klik **Create application**, lalu pilih tab **Pages**.
3. Hubungkan akun GitHub Anda dan pilih repositori proyek ini.
4. Pada bagian **Build settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Tambahkan `VITE_GAS_API_URL` pada bagian **Environment variables (advanced)**.
6. Klik **Save and Deploy**. Cloudflare otomatis membuatkan _redirect rule_ fallback untuk SPA jika Anda sudah mengatur di UI. Alternatifnya, Anda dapat menambahkan file `_redirects` di folder `public` yang berisi `/* /index.html 200` agar navigasi internal React Router berfungsi.

### 2. Vercel
Sangat ramah pengguna dan terintegrasi otomatis untuk React:
1. Login ke [Vercel](https://vercel.com/) dan klik **Add New...** -> **Project**.
2. Impor repositori GitHub dari aplikasi ini.
3. Vercel biasanya otomatis mendeteksi **Vite**. Biarkan pengaturan *Build & Development Settings* secara default.
4. Tambahkan *Environment Variable*: Nama: `VITE_GAS_API_URL`, Value: _(URL Web App GAS Anda)_.
5. Buka tab root proyek, pastikan sudah terdapat berkas `vercel.json` (bila diperlukan) yang berisi script routing untuk SPA, fungsinya agar mencegah error *"404 Not Found"* pada React Router.
   *(Contoh isi `vercel.json` untuk SPA fallbacks)*:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
6. Klik **Deploy**.

### 3. Hosting Berbasis cPanel (Shared Hosting)
Jika Anda menggunakan hosting tradisional cPanel seperti Hostinger, Niagahoster, Rumahweb, dll:
1. Buka terminal di PC/Laptop Anda, jalankan perintah build *lokal*: `npm run build`. Pastikan `.env.production` atau konfigurasi URL GAS sudah diatur.
2. Tunggu proses selesai. Anda akan mendapatkan folder baru bernama `dist`.
3. Kompres/Zipping seluruh isi **di dalam folder** `dist` (ingat: isinya, bukan folder dist-nya) menjadi format `.zip`.
4. Login ke dasbor **cPanel** hosting Anda.
5. Masuk ke **File Manager** -> **public_html** (atau sub-domain yang Anda inginkan).
6. Upload file `.zip` tadi, lalu ekstrak ke dalam `public_html`.
7. **Penting (React Router Fix):** Karena cPanel menggunakan server Apache, Anda wajib membuat sebuah file bernama `.htaccess` (jangan lupa aktifkan _Show Hidden Files_) di dalam `public_html` dan isikan baris ini agar error *404 Route* pada React App terhindari:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
8. Aplikasi website sekolah Anda sekarang dapat diakses secara publik.

---

## ✍️ Kredit & Dukungan

Supported by:
**[Abyfine Intermedia](https://abyfine.com)**
