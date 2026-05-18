import { CalendarDays, ArrowLeft, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

export default function News({ data }: { data: any }) {
  const news = data?.news || [];
  const [selectedNews, setSelectedNews] = useState<any>(null);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Extract unique categories (if 'Kategori' exists in data)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("Semua");
    news.forEach((item: any) => {
      if (item.Kategori && typeof item.Kategori === "string") {
        cats.add(item.Kategori.trim());
      }
    });
    return Array.from(cats);
  }, [news]);

  // Apply filters and sorting
  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...news];

    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item: any) => 
          (item.Judul && item.Judul.toLowerCase().includes(q)) || 
          (item.Konten && item.Konten.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((item: any) => 
        item.Kategori && item.Kategori.trim() === selectedCategory
      );
    }

    // Sort
    filtered.sort((a: any, b: any) => {
      const dateA = new Date(a.Tanggal).getTime();
      const dateB = new Date(b.Tanggal).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [news, searchQuery, selectedCategory, sortOrder]);

  if (selectedNews) {
    return (
      <div className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <button 
             onClick={() => setSelectedNews(null)}
             className="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition"
           >
              <ArrowLeft size={20} /> Kembali ke Daftar Berita
           </button>
           
           <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {selectedNews.GambarURL && (
                 <img 
                   src={selectedNews.GambarURL} 
                   alt={selectedNews.Judul} 
                   className="w-full h-auto max-h-[500px] object-cover"
                 />
              )}
              <div className="p-8 sm:p-12">
                 <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold uppercase tracking-wider mb-6">
                    <CalendarDays size={18} />
                    <time dateTime={selectedNews.Tanggal}>
                       {new Date(selectedNews.Tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                 </div>
                 <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                    {selectedNews.Judul}
                 </h1>
                 <div className="prose prose-lg prose-indigo max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedNews.Konten}
                 </div>
              </div>
           </article>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 flex-1">
      {/* Header */}
      <div className="bg-white py-16 border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Berita & Pengumuman</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Informasi terkini kegiatan, prestasi, dan pengumuman resmi dari sekolah.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative z-20">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari berita..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
            />
          </div>
          
          <div className="flex gap-4">
            {categories.length > 1 && (
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition cursor-pointer font-medium text-slate-700"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition cursor-pointer font-medium text-slate-700"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>

        {filteredAndSortedNews.length === 0 ? (
           <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xl text-slate-500 font-semibold">Berita tidak ditemukan.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedNews.map((item: any) => (
              <div 
                key={item.ID || Math.random()} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col group"
                onClick={() => setSelectedNews(item)}
              >
                <div className="aspect-video w-full bg-slate-200 overflow-hidden shrink-0">
                   {item.GambarURL ? (
                     <img src={item.GambarURL} alt={item.Judul} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                        <span className="text-sm font-semibold uppercase tracking-wider">Tanpa Gambar</span>
                     </div>
                   )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold uppercase tracking-wider mb-3">
                    <CalendarDays size={14} />
                    {new Date(item.Tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug line-clamp-2">{item.Judul}</h3>
                  <p className="text-slate-600 line-clamp-3 mb-6 flex-1">{item.Konten}</p>
                  <span className="text-indigo-600 font-bold text-sm flex items-center gap-1 mt-auto">
                    Baca selengkapnya &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
