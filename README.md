# 🕌 TV Display Jadwal Shalat - Masjid Daarul Multazimiin

Proyek ini merupakan sistem digital untuk menampilkan **jadwal shalat harian**, **countdown menuju waktu shalat berikutnya**, serta **kode QRIS untuk infaq**, yang ditujukan untuk ditampilkan pada TV digital di lingkungan masjid.

## 🎯 Fitur Utama

- ⏰ **Jadwal Shalat Otomatis**: Mengambil data waktu shalat harian dari API Aladhan berdasarkan kota Tasikmalaya.
- 🕒 **Countdown Menuju Waktu Shalat**: Menunjukkan hitung mundur waktu menuju shalat berikutnya.
- 📸 **Tampilan QRIS Infaq**: Menampilkan QR Code statis yang dapat digunakan jamaah untuk melakukan infaq secara digital.
- 📜 **Quote Islami Otomatis**: Menampilkan carousel kutipan Islami yang berubah setiap 15 detik.
- 🎨 **Desain dan Responsif**: Dengan latar Masjid Nabawi dan elemen desain yang mendukung nuansa spiritual.

## 🗂 Struktur Folder

tv-masjid-display/
│
├── index.html               # Halaman utama TV display masjid
├── TVDISPLAY.CSS            # Gaya tampilan (CSS)
├── TVDISPLAY.JS             # Logika JavaScript: jadwal, countdown, carousel
│
├── bg-nabawi.jpg            # Background tampilan utama
├── bling-stars.png          # Hiasan bintang untuk carousel quote
│
├── shubuh.png               # Icon Shubuh
├── dzuhur.png               # Icon Dzuhur
├── ashar.png                # Icon Ashar
├── magrib.png               # Icon Maghrib
├── isya.png                 # Icon Isya
│
└── qriscode.png             # Gambar kode QRIS untuk infaq


## ⚙️ Teknologi yang Digunakan

- **HTML5 & CSS3** — untuk struktur dan tampilan
- **JavaScript (Vanilla)** — untuk logika interaktif seperti countdown & fetch API
- **[Aladhan API](https://aladhan.com/prayer-times-api)** — sebagai sumber data waktu shalat

## 🧠 Cara Kerja Singkat

1. Saat halaman dimuat, JavaScript akan:
   - Mengambil waktu shalat harian dari API berdasarkan kota Tasikmalaya.
   - Menampilkan semua jadwal shalat pada kartu.
   - Menghitung waktu menuju shalat berikutnya dan memperbaruinya setiap detik.
   - Menampilkan kutipan Islami secara bergantian setiap 15 detik.

2. QRIS ditampilkan secara statis untuk mempermudah jamaah melakukan infaq melalui scan digital.

## 🔧 Cara Menjalankan

1. **Upload ke server lokal** atau gunakan layanan seperti **GitHub Pages**.
2. Pastikan semua file `*.png`, `*.css`, dan `*.js` berada di tempat yang tepat.
3. Buka `index.html` di browser dalam mode fullscreen pada TV/layar digital.

## 🧑‍💻 Developer

Dikembangkan oleh: **Raditha Amelia**  
Untuk keperluan magang di **Telkom Indonesia - Wilayah Tasikmalaya**  
Tahun: 2025
