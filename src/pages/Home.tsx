import { Link } from "react-router";
import { ArrowRight, FileText, Database, Layers } from "lucide-react";

export default function Home({ data }: { data: any }) {
  const settings = data?.settings || {};
  const news = data?.news || [];

  const schoolName = settings?.["Nama Sekolah"] || "Nama Sekolah";
  const visi = settings?.["Visi"] || "Sistem informasi sekolah terintegrasi dengan Google Sheets & Drive untuk kemudahan akses data kapan saja.";

  return (
    <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
      {/* Left Column: Hero & Stats */}
      <div className="flex-[1.2] flex flex-col gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-center relative overflow-hidden flex-1 min-h-[400px]">
          <div className="relative z-10">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Selamat Datang</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{schoolName}</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-md">{visi}</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/profil" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition">
                Jelajahi Profil
              </Link>
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium italic underline underline-offset-4">Synced to Google Sheets</span>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50 rounded-full opacity-50"></div>
          <div className="absolute -right-10 top-10 w-20 h-20 bg-indigo-100 rounded-full blur-xl"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-indigo-600 p-5 rounded-2xl text-white shadow-lg">
            <div className="text-3xl font-black">1,240</div>
            <div className="text-indigo-100 text-xs font-medium uppercase mt-1">Total Siswa</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="text-3xl font-black text-slate-800">{data?.teachers?.length || 84}</div>
            <div className="text-slate-500 text-xs font-medium uppercase mt-1">Tenaga Pendidik</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 col-span-2 md:col-span-1">
            <div className="text-3xl font-black text-slate-800">{data?.facilities?.length || 22}</div>
            <div className="text-slate-500 text-xs font-medium uppercase mt-1">Fasilitas Unggulan</div>
          </div>
        </div>
      </div>

      {/* Right Column: News & Quick Access */}
      <div className="flex-1 flex flex-col gap-6">
        {/* News Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:h-[340px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Berita Terbaru</h3>
            <Link to="/berita" className="text-xs text-indigo-600 font-bold cursor-pointer hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-4 overflow-hidden flex-1 flex flex-col justify-start">
            {news.slice(0, 3).map((item: any) => (
              <Link key={item.ID} to="/berita" className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                  {item.GambarURL ? (
                    <img src={item.GambarURL} alt={item.Judul} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-300"></div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {new Date(item.Tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <h4 className="text-sm font-bold text-slate-700 leading-snug line-clamp-2">{item.Judul}</h4>
                </div>
              </Link>
            ))}
            {news.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-sm">Belum ada berita.</div>
            )}
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Manajemen Data</h3>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <Link to="/guru" className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between hover:border-indigo-200 transition">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-indigo-600 mb-2">
                <Database size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Data Guru</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Updated via Sheets</div>
              </div>
            </Link>
            <Link to="/fasilitas" className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between hover:border-emerald-200 transition">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-600 mb-2">
                <Layers size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-700">Sarana & Prasarana</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Cloud Storage Drive</div>
              </div>
            </Link>
            <div className="col-span-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-indigo-900 italic line-clamp-1">Pendaftaran Dibuka!</div>
                  <div className="text-[10px] text-indigo-600 font-medium">Gelombang 2 s/d Desember</div>
                </div>
              </div>
              <Link to="/ppdb" className="text-indigo-600 text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 hover:bg-indigo-50 transition shrink-0">
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
