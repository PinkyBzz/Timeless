### Masalah: Gambar "Insert in Cell" tidak terbaca Apps Script
Halo! Masalahnya ada di cara memasukkan gambar di Google Sheet.

Google Apps Script **TIDAK BISA** membaca gambar yang kamu "Insert > Image inside cell" (disisipkan langsung di dalam kotak). Script hanya bisa membaca **Teks (Link URL)**.

### Solusi: Gunakan Link Google Drive

Jangan masukkan fotonnya langsung ke Sheet. Tapi lakukan ini:

1. **Upload Foto/Video ke Google Drive** (bikin folder baru biar rapi).
2. Klik Kanan pada fotonya di Google Drive -> **Share** -> **Copy Link**.
   - Pastikan aksesnya "Anyone with the link" (Siapa saja yang memiliki link).
3. **Paste Link tersebut** ke dalam kolom 'Foto' atau 'Design Logo' di Google Sheet.

Jadi di dalam kotaknya nanti isinya tulisan panjang seperti: 
`https://drive.google.com/file/d/123456789/view?usp=sharing`

Bukan gambar visualnya.

### Kenapa harus begitu?
Website butuh "alamat" (URL) untuk mengambil gambar. Kalau gambarnya ditaruh di dalam sel Excel/Sheet, itu dianggap sebagai objek gambar bukan alamat, jadi website tidak tahu cara mengambilnya.

Coba ganti satu baris dulu dengan cara Copy Link dari Google Drive, lalu refresh websitenya. Pasti muncul! 
