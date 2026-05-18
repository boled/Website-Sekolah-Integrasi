import React, { useState } from "react";
import { submitToGas } from "../services/api";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function PPDB() {
  const [formData, setFormData] = useState({
    namaSiswa: "",
    nisn: "",
    asalSekolah: "",
    nomorWA: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    nisn: "",
    nomorWA: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user types
    if (validationErrors[e.target.name as keyof typeof validationErrors]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { nisn: "", nomorWA: "" };

    // Validasi NISN: harus 10 digit angka
    if (!/^\d{10}$/.test(formData.nisn)) {
      errors.nisn = "NISN harus terdiri dari tepat 10 digit angka.";
      isValid = false;
    }

    // Validasi Nomor WhatsApp: harus angka, diawali 08 atau 628, panjang 10-15 digit
    if (!/^(08|628)\d{8,13}$/.test(formData.nomorWA)) {
      errors.nomorWA = "Nomor WhatsApp tidak valid. Gunakan format angka diawali 08 atau 628 (10-15 digit).";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Panggil API (Google Apps Script)
      const res = await submitToGas("submit_ppdb", formData);
      if (res.status === "success") {
        setStatus("success");
         setFormData({
            namaSiswa: "",
            nisn: "",
            asalSekolah: "",
            nomorWA: ""
         });
      } else {
         setStatus("error");
         setErrorMessage(res.message || "Terjadi kesalahan saat menyimpan data.");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Gagal terhubung ke server. Pastikan VITE_GAS_API_URL dikonfigurasi dengan benar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
           <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Penerimaan Peserta Didik Baru</h1>
           <p className="text-lg text-slate-600">
             Silahkan isi formulir pendaftaran online di bawah ini dengan data yang benar.
           </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-12">
             
             {status === "success" && (
                <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col items-center text-center">
                   <CheckCircle2 className="text-emerald-500 w-16 h-16 mb-4" />
                   <h3 className="text-xl font-bold text-emerald-900 mb-2">Pendaftaran Berhasil!</h3>
                   <p className="text-emerald-700">Terima kasih, data pendaftaran Anda telah kami terima dengan baik. Panitia akan segera menghubungi Anda melalui nomor WhatsApp yang diberikan.</p>
                </div>
             )}

             {status === "error" && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-start gap-3">
                   <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                   <div>
                      <span className="font-bold block mb-1">Gagal mendaftar</span>
                      {errorMessage}
                   </div>
                </div>
             )}

             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label htmlFor="namaSiswa" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Nama Lengkap Siswa</label>
                   <input
                     type="text"
                     name="namaSiswa"
                     id="namaSiswa"
                     required
                     value={formData.namaSiswa}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition shadow-sm bg-slate-50 focus:bg-white"
                     placeholder="Contoh: Ahmad Budi Santoso"
                   />
                </div>
                <div>
                   <label htmlFor="nisn" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">NISN</label>
                   <input
                     type="text"
                     name="nisn"
                     id="nisn"
                     required
                     value={formData.nisn}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition shadow-sm bg-slate-50 focus:bg-white ${validationErrors.nisn ? 'border-rose-500' : 'border-slate-300'}`}
                     placeholder="Nomor Induk Siswa Nasional"
                   />
                   {validationErrors.nisn && (
                     <p className="text-rose-500 text-sm mt-2 font-medium">{validationErrors.nisn}</p>
                   )}
                </div>
                <div>
                   <label htmlFor="asalSekolah" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Asal Sekolah (SMP/MTs)</label>
                   <input
                     type="text"
                     name="asalSekolah"
                     id="asalSekolah"
                     required
                     value={formData.asalSekolah}
                     onChange={handleChange}
                     className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition shadow-sm bg-slate-50 focus:bg-white"
                     placeholder="Contoh: SMP Negeri 1 Jakarta"
                   />
                </div>
                <div>
                   <label htmlFor="nomorWA" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Nomor WhatsApp Aktif</label>
                   <input
                     type="tel"
                     name="nomorWA"
                     id="nomorWA"
                     required
                     value={formData.nomorWA}
                     onChange={handleChange}
                     className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition shadow-sm bg-slate-50 focus:bg-white ${validationErrors.nomorWA ? 'border-rose-500' : 'border-slate-300'}`}
                     placeholder="Contoh: 081234567890"
                   />
                   {validationErrors.nomorWA && (
                     <p className="text-rose-500 text-sm mt-2 font-medium">{validationErrors.nomorWA}</p>
                   )}
                </div>

                <div className="pt-4">
                   <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed text-lg flex justify-center items-center"
                   >
                     {loading ? (
                        <span className="flex items-center gap-2">
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Memproses...
                        </span>
                     ) : (
                        "Kirim Formulir Pendaftaran"
                     )}
                   </button>
                   <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                     Dengan menekan tombol di atas, Anda menyatakan bahwa data yang diisi adalah benar.
                   </p>
                </div>
             </form>

          </div>
        </div>
      </div>
    </div>
  );
}
