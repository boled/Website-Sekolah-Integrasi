import { Link } from "react-router";
import { ArrowRight, FileText, Database, Layers, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function Home({ data }: { data: any }) {
  const settings = data?.settings || {};
  const news = data?.news || [];

  const schoolName = settings?.["Nama Sekolah"] || "Nama Sekolah";
  const visi = settings?.["Visi"] || "Sistem informasi sekolah terintegrasi dengan Google Sheets & Drive untuk kemudahan akses data kapan saja.";

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] bg-slate-900 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80" 
          alt="School Campus" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16 md:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="bg-indigo-600/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              Selamat Datang
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              {schoolName}
            </h2>
            <p className="text-slate-200 text-lg md:text-xl font-medium mb-8 max-w-2xl leading-relaxed">
              {visi}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/profil" className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition transform hover:-translate-y-1">
                Jelajahi Profil Sekoah
              </Link>
              <Link to="/ppdb" className="bg-indigo-600 border border-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                Daftar PPDB <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-900 text-white border-y border-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-indigo-800/50">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black mb-2">1,240</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider text-center">Siswa Aktif</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black mb-2">{data?.teachers?.length || 84}</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider text-center">Tenaga Pendidik</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black mb-2">{data?.facilities?.length || 22}</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider text-center">Fasilitas Unggulan</div>
            </div>
             <div className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-black mb-2">A</div>
              <div className="text-indigo-200 text-xs font-bold uppercase tracking-wider text-center">Akreditasi Sekolah</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 py-16">
        
        {/* Left Column: News */}
        <div className="flex-[1.5] w-full">
           <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900">Kabar & Informasi</h3>
              <p className="text-slate-500 mt-2">Berita terbaru kegiatan vokasi dan akademik sekolah.</p>
            </div>
            <Link to="/berita" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Semua Berita <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {news.slice(0, 4).map((item: any, i: number) => (
              <motion.div 
                key={item.ID}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <Link to="/berita" className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden relative">
                    {item.GambarURL ? (
                      <img src={item.GambarURL} alt={item.Judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <FileText size={48} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                       <span className="text-xs font-bold text-slate-800">
                         {new Date(item.Tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                       </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">{item.Judul}</h4>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">{item.Isi}</p>
                    <div className="mt-auto flex items-center text-indigo-600 font-semibold text-sm">
                      Baca selengkapnya <ArrowUpRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {news.length === 0 && (
              <div className="text-center py-12 text-slate-500 col-span-full border-2 border-dashed border-slate-200 rounded-2xl">
                Belum ada berita yang dipublikasikan.
              </div>
            )}
          </div>
          
          <div className="mt-6 sm:hidden">
            <Link to="/berita" className="flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 py-3 rounded-xl hover:bg-indigo-100 transition">
              Semua Berita <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Column: Cards & Features */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-10"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 relative">Pintasan Layanan</h3>
            <div className="space-y-4 relative">
              <Link to="/ppdb" className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/30">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Pendaftaran Siswa Baru</h4>
                  <p className="text-indigo-100 text-sm">Tahun Ajaran Baru telah dibuka, buruan daftar!</p>
                </div>
              </Link>
              <Link to="/fasilitas" className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition group">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition text-emerald-600">
                  <Layers size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition">Fasilitas Sekolah</h4>
                  <p className="text-slate-500 text-sm mt-1">Jelajahi sarana dan prasarana pendukung di sekolah.</p>
                </div>
              </Link>
               <Link to="/guru" className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition group">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition">Direktori Guru</h4>
                  <p className="text-slate-500 text-sm mt-1">Lihat profil tenaga pendidik profesional kami.</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#3b82f6)] opacity-20"></div>
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center mb-6">
                 <ArrowUpRight size={32} className="text-indigo-300" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Sistem Terintegrasi Google</h3>
               <p className="text-slate-300 mb-8 leading-relaxed">
                 Website ini ditenagai langsung menggunakan Google Workspace (Sheets & Drive).
               </p>
               <Link to="/admin" className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-indigo-50 transition block">
                 Login Admin Area
               </Link>
             </div>
          </div>

        </div>

      </section>
    </div>
  );
}
