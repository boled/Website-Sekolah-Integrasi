import { User } from "lucide-react";

export default function Teachers({ data }: { data: any }) {
  const teachers = data?.teachers || [];

  return (
    <div className="pb-24 flex-1">
      {/* Header */}
      <div className="bg-white py-16 border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Data Guru & Staff</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Tenaga pendidik profesional yang berdedikasi membimbing dan mencerdaskan siswa.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {teachers.length === 0 ? (
           <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xl text-slate-500 font-semibold">Data guru belum tersedia.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teachers.map((item: any) => (
              <div key={item.ID || item.Nama} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center hover:shadow-md transition">
                <div className="aspect-square w-full bg-slate-100 overflow-hidden relative">
                   {item.FotoURL ? (
                     <img src={item.FotoURL} alt={item.Nama} className="w-full h-full object-cover" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <User size={80} />
                     </div>
                   )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{item.Nama}</h3>
                  <p className="text-sm text-indigo-600 font-semibold">{item.Bidang}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
