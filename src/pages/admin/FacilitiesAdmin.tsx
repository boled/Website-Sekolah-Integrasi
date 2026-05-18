import { useState, useEffect, useRef } from "react";
import { submitToGas, fetchFromGas } from "../../services/api";
import { Plus, Edit2, Trash2, X, Upload, ArrowUp, ArrowDown, ImagePlus } from "lucide-react";

export default function FacilitiesAdmin() {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ ID: "", Nama: "", Deskripsi: "", FotoURL: "", ImageGalleryURLs: "" });
  const [gallery, setGallery] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const res = await fetchFromGas("get_facilities");
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
      const payloadToSave = { ...formData, ImageGalleryURLs: gallery.join(',') };
      const res = await submitToGas("save_data", { type: "facilities", payload: payloadToSave }, token!);
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
      await submitToGas("delete_data", { type: "facilities", id }, token!);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const openAdd = () => {
    setFormData({ ID: "", Nama: "", Deskripsi: "", FotoURL: "", ImageGalleryURLs: "" });
    setGallery([]);
    setIsFormOpen(true);
  };

  const openEdit = (item: any) => {
    setFormData({ 
      ID: item.ID, 
      Nama: item.Nama, 
      Deskripsi: item.Deskripsi, 
      FotoURL: item.FotoURL, 
      ImageGalleryURLs: item.ImageGalleryURLs || "" 
    });
    
    let images: string[] = [];
    if (typeof item.ImageGalleryURLs === 'string' && item.ImageGalleryURLs.trim() !== '') {
      try {
        const parsed = JSON.parse(item.ImageGalleryURLs);
        if (Array.isArray(parsed)) images = parsed;
      } catch {
        images = item.ImageGalleryURLs.split(',').map((u: string) => u.trim()).filter(Boolean);
      }
    }
    setGallery(images);
    setIsFormOpen(true);
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const token = localStorage.getItem("admin_token");
        const res = await submitToGas("upload_image", {
          fileData: base64Data,
          fileName: file.name,
          mimeType: file.type
        }, token!);
        
        if (res.status === "success" && res.data?.url) {
          setGallery(prev => [...prev, res.data.url]);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert("Gagal mengupload gambar.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newGallery = [...gallery];
    const temp = newGallery[index - 1];
    newGallery[index - 1] = newGallery[index];
    newGallery[index] = temp;
    setGallery(newGallery);
  };

  const moveDown = (index: number) => {
    if (index === gallery.length - 1) return;
    const newGallery = [...gallery];
    const temp = newGallery[index + 1];
    newGallery[index + 1] = newGallery[index];
    newGallery[index] = temp;
    setGallery(newGallery);
  };

  const removeImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    const url = prompt("Masukkan URL gambar:");
    if (url) {
      setGallery(prev => [...prev, url]);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Kelola Fasilitas</h1>
        <button onClick={openAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition">
          <Plus size={20} /> Tambah Fasilitas
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
              <h2 className="text-xl font-bold">{formData.ID ? "Edit Fasilitas" : "Tambah Fasilitas"}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Fasilitas</label>
                <input 
                  type="text" 
                  value={formData.Nama}
                  onChange={(e) => setFormData({...formData, Nama: e.target.value})}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi</label>
                <textarea 
                  value={formData.Deskripsi}
                  onChange={(e) => setFormData({...formData, Deskripsi: e.target.value})}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">URL Foto Utama (Opsional)</label>
                <input 
                  type="url" 
                  value={formData.FotoURL}
                  onChange={(e) => setFormData({...formData, FotoURL: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition"
                  placeholder="https://..."
                />
              </div>
              
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-slate-700">Gallery Layar (Opsional)</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition">
                      <Upload size={16} /> {uploading ? "Mengupload..." : "Upload"}
                    </button>
                    <button type="button" onClick={addUrl} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition">
                      <ImagePlus size={16} /> URL Baru
                    </button>
                    <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {gallery.map((url, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl">
                      <img src={url} alt="thumbnail" className="w-16 h-16 object-cover rounded-lg bg-slate-100" />
                      <div className="flex-1 truncate text-sm text-slate-600" title={url}>{url}</div>
                      <div className="flex flex-col gap-1">
                        <button type="button" onClick={() => moveUp(i)} disabled={i === 0} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowUp size={16} /></button>
                        <button type="button" onClick={() => moveDown(i)} disabled={i === gallery.length - 1} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"><ArrowDown size={16} /></button>
                      </div>
                      <button type="button" onClick={() => removeImage(i)} className="p-2 ml-2 hover:bg-rose-50 text-rose-400 hover:text-rose-600 rounded-lg transition"><Trash2 size={20} /></button>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="text-center p-6 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                      Belum ada gambar di galeri. Pilih upload dari perangkat atau tambahkan URL langsung.
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Fasilitas"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-600">Nama Fasilitas</th>
              <th className="p-4 font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.ID} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium whitespace-nowrap">{item.Nama}</td>
                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                  <button onClick={() => openEdit(item)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(item.ID)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {dataList.length === 0 && (
              <tr><td colSpan={2} className="p-4 text-center text-slate-500">Tidak ada data.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
