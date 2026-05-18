import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, School, Home, Info, BookOpen, Users, Building, ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";

export default function Layout({ settings, seo }: { settings: any, seo?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentSeo = seo?.find((item) => item.Halaman === location.pathname);

  const navLinks = [
    { name: "Beranda", path: "/", icon: Home },
    { name: "Profil", path: "/profil", icon: Info },
    { name: "Berita", path: "/berita", icon: BookOpen },
    { name: "Guru", path: "/guru", icon: Users },
    { name: "Fasilitas", path: "/fasilitas", icon: Building },
    { name: "PPDB", path: "/ppdb", icon: ClipboardList },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const schoolName = settings?.["Nama Sekolah"] || "Sistem Informasi Sekolah";
  const logoUrl = settings?.["Logo URL"];

  // Default SEO
  const title = currentSeo?.Title || schoolName;
  const description = currentSeo?.["Meta Description"] || "";
  const keywords = currentSeo?.["Meta Keywords"] || "";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
                ) : (
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {schoolName.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-slate-800 leading-tight hidden sm:block">
                    {schoolName}
                  </h1>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider hidden sm:block">Portal Informasi Akademik</p>
                </div>
                <span className="font-bold text-lg text-slate-800 sm:hidden">
                  Sistem Sekolah
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.filter(l => l.path !== '/ppdb').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200",
                    location.pathname === link.path
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/ppdb"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-indigo-700 transition"
              >
                PPDB Online
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white border-t border-slate-100 shadow-inner"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                        isActive
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-8 w-auto brightness-0 invert opacity-90" />
                ) : (
                  <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">
                    {schoolName.charAt(0)}
                  </div>
                )}
                <span className="font-bold text-xl text-white">
                  {schoolName}
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Berkomitmen untuk memberikan pendidikan terbaik bagi generasi penerus bangsa.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Kontak</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{settings?.Alamat || "Jl. Pendidikan No.1"}</li>
                <li>Telepon: {settings?.Telepon || "(021) 123456"}</li>
                <li>Email: {settings?.Email || "info@sekolah.id"}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/ppdb" className="text-slate-400 hover:text-white transition-colors">Pendaftaran Siswa Baru</Link></li>
                <li><Link to="/berita" className="text-slate-400 hover:text-white transition-colors">Berita Terbaru</Link></li>
                <li><Link to="/profil" className="text-slate-400 hover:text-white transition-colors">Profil Sekolah</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center md:text-left text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
             <p>&copy; {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
             <p className="text-xs">Powered by Google Workspace Engine</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
