import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

function FacilityCard({ item }: { item: any; key?: React.Key }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const words = item.Deskripsi?.split(" ") || [];
  const isLongText = words.length > 20;

  const displayText = isExpanded || !isLongText 
    ? item.Deskripsi 
    : words.slice(0, 20).join(" ") + "...";

  let images: string[] = [];
  if (Array.isArray(item.ImageGalleryURLs) && item.ImageGalleryURLs.length > 0) {
    images = item.ImageGalleryURLs;
  } else if (typeof item.ImageGalleryURLs === 'string' && item.ImageGalleryURLs.trim() !== '') {
    try {
      const parsed = JSON.parse(item.ImageGalleryURLs);
      if (Array.isArray(parsed)) images = parsed;
    } catch {
      images = item.ImageGalleryURLs.split(',').map((u: string) => u.trim()).filter(Boolean);
    }
  }

  // Fallback to FotoURL if ImageGalleryURLs is empty
  if (images.length === 0 && item.FotoURL) {
    images = [item.FotoURL];
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col group">
      <div className="aspect-video w-full bg-slate-100 overflow-hidden relative shrink-0 group/gallery">
         {images.length > 0 ? (
           <>
             <img src={images[currentImageIndex]} alt={item.Nama} className="w-full h-full object-cover transition duration-500" />
             {images.length > 1 && (
               <>
                 <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition opacity-0 group-hover/gallery:opacity-100">
                    <ChevronLeft size={20} />
                 </button>
                 <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full backdrop-blur-sm transition opacity-0 group-hover/gallery:opacity-100">
                    <ChevronRight size={20} />
                 </button>
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/gallery:opacity-100 transition">
                   {images.map((_, idx) => (
                     <button
                       key={idx} 
                       onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                       className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`} 
                     />
                   ))}
                 </div>
               </>
             )}
           </>
         ) : (
           <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <Building2 size={64} />
           </div>
         )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.Nama}</h3>
        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap flex-1">{displayText}</p>
        {isLongText && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-600 font-bold text-sm mt-4 text-left hover:underline self-start shrink-0"
          >
            {isExpanded ? "Tutup selengkapnya" : "Baca selengkapnya"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Facilities({ data }: { data: any }) {
  const facilities = data?.facilities || [];

  return (
    <div className="pb-24 flex-1">
      {/* Header */}
      <div className="bg-white py-16 border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Sarana & Prasarana</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Fasilitas pendukung untuk menciptakan lingkungan belajar yang nyaman, aman, dan berkualitas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {facilities.length === 0 ? (
           <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xl text-slate-500 font-semibold">Data sarana & prasarana belum tersedia.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((item: any) => (
              <FacilityCard key={item.ID || item.Nama} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
