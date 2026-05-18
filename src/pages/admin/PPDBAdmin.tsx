import { useState, useEffect } from "react";
import { submitToGas, fetchFromGas } from "../../services/api";
import { Plus, Edit2, Trash2, X, Download } from "lucide-react";

export default function PPDBAdmin() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ ID: "", NamaSiswa: "", NISN: "", AsalSekolah: "", NomorWA: "" });

  const loadData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      // Appending token to the URL manually or modify fetchFromGas to support token via query param
      // To simplify, let's just make a POST request via submitToGas with a custom action for getting secured list, 
      // but let's see how fetchFromGas looks.
      // Wait, fetchFromGas sends GET request. We can just add query logic.
      const urlParams = new URLSearchParams(window.location.search);
      // Wait we don't need url params, we can just use submitToGas 'get_ppdb' POST action, let's create a get_data post action or change fetchFromGas
      
      const res = await submitToGas("get_ppdb", {}, token!);
      if (res.status === "success" || res.data) {
        setDataList(res.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("admin_token");
    try {
      const res = await submitToGas("save_data", { type: "ppdb", payload: formData }, token!);
      setMessage(res.message || "Berhasil disimpan");
      setIsFormOpen(false);
      loadData();
    } catch (err: any) {
      setMessage(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await submitToGas("delete_data", { type: "ppdb", id }, token!);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const openAdd = () => {
    setFormData({ ID: "", NamaSiswa: "", NISN: "", AsalSekolah: "", NomorWA: "" });
    setIsFormOpen(true);
  };

  const openEdit = (item: any) => {
    setFormData({ 
      ID: item.ID, 
      NamaSiswa: item.NamaSiswa, 
      NISN: item.NISN, 
      AsalSekolah: item.AsalSekolah, 
      NomorWA: item.NomorWA 
    });
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Data Pendaftar PPDB</h1>
        <button onClick={openAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition">
          <Plus size={20} /> Tambah Data
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-indigo-50 text-indigo-700 font-medium">
          {message}
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{formData.ID ? "Edit Data PPDB" : "Tambah Data PPDB"}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Siswa</label>
                <input 
                  type="text" 
                  value={formData.NamaSiswa}
                  onChange={(e) => setFormData({...formData, NamaSiswa: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">NISN</label>
                  <input 
                    type="text" 
                    value={formData.NISN}
                    onChange={(e) => setFormData({...formData, NISN: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WA</label>
                  <input 
                    type="text" 
                    value={formData.NomorWA}
                    onChange={(e) => setFormData({...formData, NomorWA: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Asal Sekolah</label>
                <input 
                  type="text" 
                  value={formData.AsalSekolah}
                  onChange={(e) => setFormData({...formData, AsalSekolah: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Data"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-600">Waktu Daftar</th>
              <th className="p-4 font-semibold text-slate-600">Siswa</th>
              <th className="p-4 font-semibold text-slate-600">NISN</th>
              <th className="p-4 font-semibold text-slate-600">Asal Sekolah</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.ID} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="p-4 text-slate-500">{item.WaktuPendaftar ? new Date(item.WaktuPendaftar).toLocaleDateString("id-ID") : "-"}</td>
                <td className="p-4 font-medium">
                  {item.NamaSiswa}
                  <div className="text-sm font-normal text-slate-500">{item.NomorWA}</div>
                </td>
                <td className="p-4">{item.NISN}</td>
                <td className="p-4">{item.AsalSekolah}</td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => openEdit(item)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.ID)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {dataList.length === 0 && (
              <tr><td colSpan={5} className="p-4 text-center text-slate-500">Tidak ada data pendaftar.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
