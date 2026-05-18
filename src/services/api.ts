/// <reference types="vite/client" />

export async function fetchFromGas(action: string) {
  const url = import.meta.env.VITE_GAS_API_URL;
  if (!url || url.includes("ganti_dengan_id")) {
    console.warn("GAS URL belum di-set, mengembalikan data dummy (Mock)");
    return getMockData(action);
  }

  try {
    const res = await fetch(`${url}?action=${action}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const json = await res.json();
    if (json.status === "error") throw new Error(json.message);
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data dari Google Apps Script:", error);
    // Fallback ke mock data jika gagal
    return getMockData(action);
  }
}

export async function submitToGas(action: string, payload: any, token?: string) {
  const url = import.meta.env.VITE_GAS_API_URL;
  if (!url || url.includes("ganti_dengan_id")) {
    console.warn("GAS URL belum di-set, simulasi sukses (Mock)");
    if (action === 'login') {
      if (payload.username === 'admin' && payload.password === 'admin123') {
        return { status: 'success', data: { token: 'mock-token-123', username: 'admin' } };
      } else {
        throw new Error('Username atau Password salah (Mock)');
      }
    }
    return { status: "success", mock: true };
  }

  try {
    const reqBody: any = { action, payload };
    if (token) reqBody.token = token;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      // Saat fetch ke apps script dari origin berbeda dan menggunakan POST, 
      // kita harus menggunakan text/plain karena preflight CORS apps script kadang gagal.
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    
    // GAS selalu melempar redirect untuk cross domain post, seringkali JS fetch 'follow' akan berhasil, 
    // tetapi kita tangani jika response sudah json.
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Gagal mengirim data ke Google Apps Script:", error);
    throw error;
  }
}

// Mock Data untuk Preview / Jika GAS Belum Diset
function getMockData(action: string) {
  if (action === "get_all_public") {
    return {
      settings: {
        "Nama Sekolah": "SMA Negeri 1 Nusantara",
        "Logo URL": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_Pendidikan_Nasional_Indonesia.svg",
        "Alamat": "Jl. Pendidikan No. 1, Jakarta",
        "Telepon": "021-12345678",
        "Email": "info@sman1nusantara.sch.id",
        "Sejarah": "SMA Negeri 1 Nusantara didirikan pada tahun 1980 dengan komitmen unggul dalam akademik dan karakter.",
        "Visi": "Menjadi sekolah unggulan yang mencetak lulusan berakhlak mulia, cerdas, dan kompetitif di era global.",
        "Misi": "- Meningkatkan kualitas pembelajaran.\n- Mengembangkan potensi peserta didik.\n- Menumbuhkan budaya peduli lingkungan."
      },
      news: [
        { ID: "1", Tanggal: "2024-05-10", Judul: "Juara 1 Olimpiade Sains Nasional", Konten: "Siswa SMAN 1 Nusantara berhasil meraih medali emas dalam bidang Fisika di ajang OSN 2024.", GambarURL: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=600&auto=format&fit=crop" },
        { ID: "2", Tanggal: "2024-04-20", Judul: "Penerimaan Peserta Didik Baru (PPDB) 2024", Konten: "Siapkan diri Anda, PPDB SMAN 1 Nusantara akan segera dibuka.", GambarURL: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop" },
      ],
      teachers: [
        { ID: "1", Nama: "Budi Santoso, S.Pd", Bidang: "Guru Matematika / Kepala Sekolah", FotoURL: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&h=200&auto=format&fit=crop" },
        { ID: "2", Nama: "Anita Ratnasari, M.Si", Bidang: "Guru Fisika", FotoURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" },
        { ID: "3", Nama: "Joko Widodo, S.Kom", Bidang: "Guru TIK", FotoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop" },
      ],
      facilities: [
        { ID: "1", Nama: "Laboratorium Komputer", Deskripsi: "Fasilitas lab komputer dengan perangkat spesifikasi tinggi.", FotoURL: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop" },
        { ID: "2", Nama: "Perpustakaan Lengkap", Deskripsi: "Koleksi buku fiksi dan non-fiksi serta akses internet gratis.", FotoURL: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop" },
        { ID: "3", Nama: "Lapangan Olah Raga Terpadu", Deskripsi: "Lapangan untuk futsal, basket, dan voli.", FotoURL: "https://images.unsplash.com/photo-1589139885834-026cc1d6dabd?q=80&w=600&auto=format&fit=crop" },
      ]
    };
  }
  return null;
}
