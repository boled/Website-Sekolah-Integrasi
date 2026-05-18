/**
 * Google Apps Script Backend for School Website
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet inside your Google Drive.
 * 2. Go to Extensions > Apps Script in the Google Sheet menu.
 * 3. Replace the default Code.gs with this exact file content.
 * 4. In the Apps Script editor toolbar (top), select the function `setupDataSheets` and click "Run".
 *    This will automatically generate all required sheets and headers for you.
 * 5. Click Deploy > New deployment. 
 *    - Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Copy the "Web app URL" and use it in your .env configuration as VITE_GAS_API_URL.
 */

const SHEET_SETTINGS = 'Pengaturan';
const SHEET_SEO = 'Pengaturan SEO';
const SHEET_NEWS = 'Berita';
const SHEET_TEACHERS = 'Guru';
const SHEET_FACILITIES = 'Fasilitas';
const SHEET_PPDB = 'PPDB';
const SHEET_ADMIN = 'AdminUsers';
const SHEET_SESSIONS = 'AdminSessions';

/**
 * Run this function once from the Apps Script editor to initialize the sheets.
 */
function setupDataSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Pengaturan
  let sheetSettings = ss.getSheetByName(SHEET_SETTINGS);
  if (!sheetSettings) {
    sheetSettings = ss.insertSheet(SHEET_SETTINGS);
    sheetSettings.appendRow(['Key', 'Value']);
    // Default data
    sheetSettings.appendRow(['Nama Sekolah', 'SMA Tunas Bangsa']);
    sheetSettings.appendRow(['Logo URL', '']);
    sheetSettings.appendRow(['URL Website', 'https://sekolahkita.com']);
    sheetSettings.appendRow(['Alamat', 'Jl. Pendidikan No. 1, Jakarta']);
    sheetSettings.appendRow(['Telepon', '021-12345678']);
    sheetSettings.appendRow(['Email', 'info@smatunasbangsa.sch.id']);
    sheetSettings.appendRow(['Visi', 'Membangun Karakter & Prestasi Masa Depan']);
    sheetSettings.appendRow(['Misi', '- Mengembangkan potensi akademik.\n- Menumbuhkan karakter bangsa.']);
    sheetSettings.appendRow(['Sejarah', 'SMA Tunas Bangsa didirikan untuk memberikan kontribusi nyata bagi dunia pendidikan.']);
    sheetSettings.getRange("A1:B1").setFontWeight("bold");
    sheetSettings.setColumnWidth(1, 150);
    sheetSettings.setColumnWidth(2, 400);
  }

  // Pengaturan SEO
  let sheetSeo = ss.getSheetByName(SHEET_SEO);
  if (!sheetSeo) {
    sheetSeo = ss.insertSheet(SHEET_SEO);
    sheetSeo.appendRow(['Halaman', 'Title', 'Meta Description', 'Meta Keywords']);
    sheetSeo.appendRow(['/', 'Beranda - Sekolah Kita', 'Website resmi sekolah kami.', 'sekolah, pendidikan']);
    sheetSeo.appendRow(['/profil', 'Profil - Sekolah Kita', 'Profil lengkap, visi, misi, dan sejarah.', 'profil, visi, misi']);
    sheetSeo.appendRow(['/berita', 'Berita - Sekolah Kita', 'Berita dan pengumuman terbaru.', 'berita, informasi']);
    sheetSeo.appendRow(['/guru', 'Guru - Sekolah Kita', 'Daftar staf pengajar dan guru.', 'guru, pengajar']);
    sheetSeo.appendRow(['/fasilitas', 'Fasilitas - Sekolah Kita', 'Daftar fasilitas penunjang belajar.', 'fasilitas, sekolah']);
    sheetSeo.appendRow(['/ppdb', 'PPDB - Sekolah Kita', 'Pendaftaran peserta didik baru online.', 'ppdb, pendaftaran']);
    sheetSeo.getRange("A1:D1").setFontWeight("bold");
    sheetSeo.setColumnWidth(2, 200);
    sheetSeo.setColumnWidth(3, 300);
    sheetSeo.setColumnWidth(4, 200);
  }

  // 2. Berita
  let sheetNews = ss.getSheetByName(SHEET_NEWS);
  if (!sheetNews) {
    sheetNews = ss.insertSheet(SHEET_NEWS);
    sheetNews.appendRow(['ID', 'Tanggal', 'Judul', 'Konten', 'GambarURL']);
    sheetNews.getRange("A1:E1").setFontWeight("bold");
    sheetNews.setColumnWidth(4, 300);
  }

  // 3. Guru
  let sheetTeachers = ss.getSheetByName(SHEET_TEACHERS);
  if (!sheetTeachers) {
    sheetTeachers = ss.insertSheet(SHEET_TEACHERS);
    sheetTeachers.appendRow(['ID', 'Nama', 'Bidang', 'FotoURL']);
    sheetTeachers.getRange("A1:D1").setFontWeight("bold");
  }

  // 4. Fasilitas
  let sheetFacilities = ss.getSheetByName(SHEET_FACILITIES);
  if (!sheetFacilities) {
    sheetFacilities = ss.insertSheet(SHEET_FACILITIES);
    sheetFacilities.appendRow(['ID', 'Nama', 'Deskripsi', 'FotoURL', 'ImageGalleryURLs']);
    sheetFacilities.getRange("A1:E1").setFontWeight("bold");
    sheetFacilities.setColumnWidth(2, 200);
    sheetFacilities.setColumnWidth(3, 400);
    sheetFacilities.setColumnWidth(4, 300);
    sheetFacilities.setColumnWidth(5, 300);
  }

  // 5. PPDB
  let sheetPPDB = ss.getSheetByName(SHEET_PPDB);
  if (!sheetPPDB) {
    sheetPPDB = ss.insertSheet(SHEET_PPDB);
    sheetPPDB.appendRow(['ID', 'WaktuPendaftar', 'NamaSiswa', 'NISN', 'AsalSekolah', 'NomorWA']);
    sheetPPDB.getRange("A1:F1").setFontWeight("bold");
  }

  // 6. Admin
  let sheetAdmin = ss.getSheetByName(SHEET_ADMIN);
  if (!sheetAdmin) {
    sheetAdmin = ss.insertSheet(SHEET_ADMIN);
    sheetAdmin.appendRow(['Username', 'Password']);
    sheetAdmin.appendRow(['admin', 'admin123']); // Default admin, password admin123
    sheetAdmin.getRange("A1:B1").setFontWeight("bold");
  }

  // 7. Sessions
  let sheetSessions = ss.getSheetByName(SHEET_SESSIONS);
  if (!sheetSessions) {
    sheetSessions = ss.insertSheet(SHEET_SESSIONS);
    sheetSessions.appendRow(['Token', 'Username', 'Expiry']);
    sheetSessions.getRange("A1:C1").setFontWeight("bold");
  }

  // Remove default 'Sheet1' if it exists and is empty
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) {
    ss.deleteSheet(sheet1);
  }

  return "Selesai membuat sheet. Silakan deploy sebagai Web App.";
}

function doGet(e) {
  const action = e.parameter.action;
  let responseData = {};

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Auto setup if sheets aren't initialized yet
    if (!ss.getSheetByName(SHEET_SETTINGS)) {
      setupDataSheets();
    }

    if (action === 'get_settings') {
      responseData = getSheetDataAsObject(ss, SHEET_SETTINGS);
    } else if (action === 'setup') {
      responseData = { message: setupDataSheets() };
    } else if (action === 'get_news') {
      responseData = getSheetDataAsArray(ss, SHEET_NEWS);
    } else if (action === 'get_teachers') {
      responseData = getSheetDataAsArray(ss, SHEET_TEACHERS);
    } else if (action === 'get_facilities') {
      responseData = getSheetDataAsArray(ss, SHEET_FACILITIES);
    } else if (action === 'get_ppdb') {
      const token = e.parameter.token;
      if (!validateToken(ss, token)) throw new Error('Unauthorized');
      responseData = getSheetDataAsArray(ss, SHEET_PPDB);
    } else if (action === 'get_all_public') {
      responseData = {
        settings: getSheetDataAsObject(ss, SHEET_SETTINGS),
        seo: getSheetDataAsArray(ss, SHEET_SEO),
        news: getSheetDataAsArray(ss, SHEET_NEWS),
        teachers: getSheetDataAsArray(ss, SHEET_TEACHERS),
        facilities: getSheetDataAsArray(ss, SHEET_FACILITIES),
      };
    } else {
      throw new Error('Invalid action');
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: responseData }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === 'submit_ppdb') {
      const sheet = ss.getSheetByName(SHEET_PPDB);
      if (!sheet) throw new Error("Sheet PPDB tidak ditemukan.");
      
      const newRow = [
        generateId(),
        new Date().toISOString(),
        data.payload.namaSiswa || '',
        data.payload.nisn || '',
        data.payload.asalSekolah || '',
        data.payload.nomorWA || ''
      ];
      
      sheet.appendRow(newRow);
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data PPDB berhasil disimpan.' }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (action === 'login') {
      const { username, password } = data.payload;
      const sheetAdmin = ss.getSheetByName(SHEET_ADMIN);
      const dataAdmin = sheetAdmin.getDataRange().getValues();
      let isValid = false;
      for (let i = 1; i < dataAdmin.length; i++) {
        if (dataAdmin[i][0] === username && dataAdmin[i][1] === password) {
          isValid = true;
          break;
        }
      }
      if (!isValid) throw new Error('Username atau Password salah');
      
      const token = generateId() + generateId();
      const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
      const sheetSessions = ss.getSheetByName(SHEET_SESSIONS);
      sheetSessions.appendRow([token, username, expiry]);
      
      // Cleanup old sessions
      cleanupSessions(ss);
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: { token, username } }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (action === 'validate_token') {
      const { token } = data.payload;
      if (!token) throw new Error('Unauthorized');
      if (!validateToken(ss, token)) throw new Error('Invalid or expired token');
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Token is valid' }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (action === 'get_ppdb') {
      if (!validateToken(ss, data.token)) throw new Error('Unauthorized');
      const responseData = getSheetDataAsArray(ss, SHEET_PPDB);
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: responseData }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (action === 'update_settings') {
      if (!validateToken(ss, data.token)) throw new Error('Unauthorized');
      const payload = data.payload;
      const sheet = ss.getSheetByName(SHEET_SETTINGS);
      const values = sheet.getDataRange().getValues();
      
      for (const key in payload) {
         let found = false;
         for (let i = 1; i < values.length; i++) {
            if (values[i][0] === key) {
               sheet.getRange(i + 1, 2).setValue(payload[key]);
               found = true;
               break;
            }
         }
         if (!found) {
            sheet.appendRow([key, payload[key]]);
         }
      }
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Pengaturan berhasil disimpan' }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (action === 'save_data' || action === 'delete_data') {
      // Admin protected actions
      if (!validateToken(ss, data.token)) throw new Error('Unauthorized');
      
      const { type, payload, id } = data.payload;
      let sheetName = '';
      if (type === 'news') sheetName = SHEET_NEWS;
      else if (type === 'teachers') sheetName = SHEET_TEACHERS;
      else if (type === 'facilities') sheetName = SHEET_FACILITIES;
      else if (type === 'ppdb') sheetName = SHEET_PPDB;
      else if (type === 'settings') sheetName = SHEET_SETTINGS;
      else throw new Error('Invalid type');

      const sheet = ss.getSheetByName(sheetName);
      
      if (action === 'save_data') {
        if (!payload.ID && !payload.id) {
          payload.ID = Utilities.getUuid();
        }
        const updateId = payload.ID || payload.id;
        
        const values = sheet.getDataRange().getValues();
        let rowIndex = -1;
        for (let i = 1; i < values.length; i++) {
           if (values[i][0] == updateId) {
             rowIndex = i + 1;
             break;
           }
        }

        if (rowIndex > -1) {
           // Update existing row
           const headers = values[0];
           const rowData = headers.map(h => payload[h] !== undefined ? payload[h] : values[rowIndex-1][headers.indexOf(h)]);
           sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
        } else {
           // Add new row
           if (type === 'news' && !payload.Tanggal) payload.Tanggal = new Date().toISOString();
           if (type === 'ppdb' && !payload.WaktuPendaftar) payload.WaktuPendaftar = new Date().toISOString();
           
           const headers = values[0];
           const rowData = headers.map(h => payload[h] !== undefined ? payload[h] : '');
           sheet.appendRow(rowData);
        }
        return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data berhasil disimpan' }))
          .setMimeType(ContentService.MimeType.JSON);
      } else if (action === 'delete_data') {
        const deleteId = id;
        const values = sheet.getDataRange().getValues();
        let rowIndex = -1;
        for (let i = 1; i < values.length; i++) {
           if (values[i][0] == deleteId) {
             rowIndex = i + 1;
             break;
           }
        }
        if (rowIndex > -1) {
           sheet.deleteRow(rowIndex);
           return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data berhasil dihapus' }))
             .setMimeType(ContentService.MimeType.JSON);
        } else {
           throw new Error('Data tidak ditemukan');
        }
      }
      
    } else if (action === 'upload_image') {
      if (!validateToken(ss, data.token)) throw new Error('Unauthorized');
      const { fileData, fileName, mimeType } = data.payload;
      if (!fileData) throw new Error('No file data provided');
      
      const base64Data = fileData.split(',')[1] || fileData;
      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType || 'image/jpeg', fileName || `upload_${Date.now()}.jpg`);
      const file = DriveApp.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      const fileId = file.getId();
      const directUrl = "https://drive.google.com/uc?id=" + fileId;
      
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: { url: directUrl } }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
     return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function cleanupSessions(ss) {
  const sheet = ss.getSheetByName(SHEET_SESSIONS);
  if (!sheet) return;
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return;
  
  const now = new Date();
  const rowsToDelete = [];
  for (let i = 1; i < values.length; i++) {
    const expiry = new Date(values[i][2]);
    if (expiry < now) {
      rowsToDelete.push(i + 1);
    }
  }
  
  for (let i = rowsToDelete.length - 1; i >= 0; i--) {
    sheet.deleteRow(rowsToDelete[i]);
  }
}

function validateToken(ss, token) {
  if (!token) return false;
  const sheet = ss.getSheetByName(SHEET_SESSIONS);
  if (!sheet) return false;
  const values = sheet.getDataRange().getValues();
  const now = new Date();
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === token) {
      const expiry = new Date(values[i][2]);
      if (expiry > now) {
        return true;
      }
    }
  }
  return false;
}

function getSheetDataAsArray(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

function getSheetDataAsObject(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return {};
  const data = sheet.getDataRange().getValues();
  let obj = {};
  data.forEach(row => {
    if(row[0]) obj[row[0]] = row[1];
  });
  return obj;
}

function generateId() {
  return Utilities.getUuid();
}
