import { useState, useEffect } from "react";
import { submitToGas, fetchFromGas } from "../../services/api";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function TeachersAdmin() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ ID: "", Nama: "", Bidang: "", FotoURL: "" });

  const loadData = async () => {
    try {
      const res = await fetchFromGas("get_teachers");
      if (res.status === "success") {
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
      const res = await submitToGas("save_data", { type: "teachers", payload: formData }, token!);
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
      await submitToGas("delete_data", { type: "teachers", id }, token!);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const openAdd = () => {
    setFormData({ ID: "", Nama: "", Bidang: "", FotoURL: "" });
    setIsFormOpen(true);
  };

  const openEdit = (item: any) => {
    setFormData({ ID: item.ID, Nama: item.Nama, Bidang: item.Bidang, FotoURL: item.FotoURL });
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Guru</h1>
        <button onClick={openAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition">
          <Plus size={20} /> Tambah Guru
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
              <h2 className="text-xl font-bold">{formData.ID ? "Edit Guru" : "Tambah Guru"}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.Nama}
                  onChange={(e) => setFormData({...formData, Nama: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Bidang Studi</label>
                <input 
                  type="text" 
                  value={formData.Bidang}
                  onChange={(e) => setFormData({...formData, Bidang: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">URL Foto (Opsional)</label>
                <input 
                  type="url" 
                  value={formData.FotoURL}
                  onChange={(e) => setFormData({...formData, FotoURL: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  placeholder="https://..."
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Guru"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-600">Nama Lengkap</th>
              <th className="p-4 font-semibold text-slate-600">Bidang</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.ID} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{item.Nama}</td>
                <td className="p-4 text-slate-500">{item.Bidang}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openEdit(item)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.ID)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {dataList.length === 0 && (
              <tr><td colSpan={3} className="p-4 text-center text-slate-500">Tidak ada data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
