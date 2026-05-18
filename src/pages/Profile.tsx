import { School, MapPin, Mail, Phone, History } from "lucide-react";

export default function Profile({ data }: { data: any }) {
  const settings = data?.settings || {};

  return (
    <div className="pb-24 flex-1">
      {/* Header */}
      <div className="bg-white py-16 border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Profil Sekolah</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Mengenal lebih dekat visi, misi, sejarah, dan identitas {settings?.["Nama Sekolah"] || "Sekolah Kami"}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
               {settings?.["Logo URL"] ? (
                  <div className="flex justify-center mb-6">
                     <img src={settings["Logo URL"]} alt="Logo Sekolah" className="h-32 w-auto" />
                  </div>
               ) : (
                 <div className="flex justify-center mb-6 text-slate-300">
                    <School size={100} />
                 </div>
               )}
               <h2 className="text-xl font-bold text-slate-900 text-center mb-6">{settings?.["Nama Sekolah"] || "Nama Sekolah"}</h2>
               
               <div className="space-y-4">
                  <div className="flex items-start gap-3 text-slate-600">
                     <MapPin className="shrink-0 mt-1 text-indigo-600" size={20} />
                     <span>{settings?.Alamat || "Jl. Pendidikan No.1, Kota, Negara"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                     <Phone className="shrink-0 text-emerald-600" size={20} />
                     <span>{settings?.Telepon || "(000) 000-0000"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                     <Mail className="shrink-0 text-rose-600" size={20} />
                     <span>{settings?.Email || "info@sekolah.id"}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Visi & Misi */}
            <section>
               <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <TrophyIcon className="text-indigo-600" /> Visi & Misi
               </h3>
               <div className="prose prose-indigo max-w-none text-slate-700 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-6">
                     <h4 className="text-lg font-bold text-indigo-900 mb-2">Visi:</h4>
                     <p className="text-indigo-800 italic font-medium">
                        "{settings?.Visi || "Belum ada visi yang ditetapkan."}"
                     </p>
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-900 mb-3">Misi:</h4>
                     <div className="whitespace-pre-line text-slate-600 ml-4 leading-relaxed">
                        {settings?.Misi || "Belum ada misi yang ditetapkan."}
                     </div>
                  </div>
               </div>
            </section>

            {/* Sejarah */}
            <section>
               <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <History className="text-indigo-600" /> Sejarah Singkat
               </h3>
               <div className="prose prose-indigo max-w-none text-slate-600 whitespace-pre-line bg-white p-8 rounded-2xl border border-slate-200 shadow-sm leading-relaxed">
                  {settings?.Sejarah || "Sejarah sekolah belum ditambahkan."}
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7c0 6 4 10 6 10s6-4 6-10V2z" />
    </svg>
  )
}
