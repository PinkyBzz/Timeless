function doGet(e) {
  // 1. Ambil Sheet yang sedang aktif
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 2. Ambil semua data
  var data = sheet.getDataRange().getValues();
  
  // 3. Pisahkan Header (Baris 1) dan Data (Baris 2 dst)
  var headers = data[0];
  var rows = data.slice(1);
  
  // 4. Ubah menjadi format JSON (Array of Objects)
  var result = rows.map(function(row) {
    var obj = {};
    headers.forEach(function(header, index) {
      // Pastikan nama header dioalah jadi string yang aman
      // Contoh: " Foto " -> "Foto"
      var key = header.toString().trim(); 
      if (key) {
        obj[key] = row[index];
      }
    });
    return obj;
  });
  
  // 5. Kembalikan data sebagai JSON
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}