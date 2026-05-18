import { useState, useEffect } from "react";
import { submitToGas, fetchFromGas } from "../../services/api";
import { Save } from "lucide-react";

export default function SettingsAdmin() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const res = await fetchFromGas("get_settings");
      if (res.status === "success") {
        setFormData(res.data || {});
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("admin_token");
    try {
      const res = await submitToGas("update_settings", formData, token!);
      setMessage(res.message || "Pengaturan berhasil disimpan");
    } catch (err: any) {
      setMessage(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Pengaturan Sekolah</h1>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-indigo-50 text-indigo-700 font-medium">
          {message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Sekolah</label>
              <input 
                type="text" 
                value={formData["Nama Sekolah"] || ""}
                onChange={(e) => handleChange("Nama Sekolah", e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Logo URL (Opsional)</label>
              <input 
                type="url" 
                value={formData["Logo URL"] || ""}
                onChange={(e) => handleChange("Logo URL", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">URL Website</label>
              <input 
                type="url" 
                value={formData["URL Website"] || ""}
                onChange={(e) => handleChange("URL Website", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Email</label>
              <input 
                type="email" 
                value={formData["Email"] || ""}
                onChange={(e) => handleChange("Email", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Telepon</label>
              <input 
                type="text" 
                value={formData["Telepon"] || ""}
                onChange={(e) => handleChange("Telepon", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat</label>
            <textarea 
              value={formData["Alamat"] || ""}
              onChange={(e) => handleChange("Alamat", e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Visi</label>
            <textarea 
              value={formData["Visi"] || ""}
              onChange={(e) => handleChange("Visi", e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Misi</label>
            <textarea 
              value={formData["Misi"] || ""}
              onChange={(e) => handleChange("Misi", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sejarah Singkat</label>
            <textarea 
              value={formData["Sejarah"] || ""}
              onChange={(e) => handleChange("Sejarah", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
             <button 
                type="submit" 
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? "Menyimpan..." : "Simpan Pengaturan"}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
