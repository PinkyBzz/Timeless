# Timeless — Creative Studio Website

Black & white responsive website for a creative studio offering photography, videography, and logo design. Includes smooth animations, WhatsApp/Instagram contact, and a gallery page.

## Struktur
- index.html — Beranda
- services.html — Layanan
- gallery.html — Galeri
- contact.html — Kontak & form brief
- assets/css/styles.css — Styles monochrome + animasi
- assets/js/main.js — Navigasi, reveal, kontak dynamic
- assets/gallery/ — Taruh gambar galeri Anda di sini

## Cara pakai
1. Edit nomor WhatsApp, username Instagram, dan email tujuan di `assets/js/main.js`:
   - PHONE = '62812xxxxxxx'
   - IG = 'username_anda'
   - EMAIL = 'timelessgacor25@gmail.com'
2. (Opsional) Ganti nomor juga pada generator link di `contact.html`.
3. Taruh karya Anda di folder `assets/gallery/` dan ubah `gallery.html` agar menunjuk ke file tersebut.

## Jalankan lokal
Cukup buka `index.html` di browser. Semua halaman statis.

## Catatan
- Warna: hitam & putih (grayscale), aksen minimal.
- Animasi scroll halus (IntersectionObserver) dan transisi ringan.
- Navigasi mobile slide/fade.
