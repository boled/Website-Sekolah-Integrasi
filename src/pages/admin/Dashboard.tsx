export default function Dashboard() {
  const username = localStorage.getItem("admin_username") || "Admin";

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Selamat datang, {username}!</h1>
      <p className="text-slate-500 mt-2">Ini adalah halaman dashboard admin sekolah.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700">Total Berita</h3>
            <p className="text-4xl font-black text-indigo-600 mt-4">12</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700">Total Fasilitas</h3>
            <p className="text-4xl font-black text-indigo-600 mt-4">8</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-700">Pendaftar PPDB</h3>
            <p className="text-4xl font-black text-indigo-600 mt-4">45</p>
         </div>
      </div>
    </div>
  );
}
