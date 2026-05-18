import { Outlet, Navigate, useNavigate } from "react-router";
import { LogOut, LayoutDashboard, FileText, Settings, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

export default function AdminLayout() {
  const token = localStorage.getItem("admin_token");
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/admin/login");
  };

  const navs = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: Settings },
    { name: "Kelola Berita", path: "/admin/berita", icon: FileText },
    { name: "Kelola Guru", path: "/admin/guru", icon: FileText },
    { name: "Kelola Fasilitas", path: "/admin/fasilitas", icon: FileText },
    { name: "Data PPDB", path: "/admin/ppdb", icon: FileText },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between p-4 shrink-0">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={toggleMobileMenu} className="p-2 bg-slate-800 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-slate-900 text-white flex-col shrink-0 fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:flex`}>
        <div className="p-6 hidden md:block">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-1">Sistem Informasi Sekolah</p>
        </div>
        
        {/* Mobile close button inside sidebar */}
        <div className="p-4 md:hidden flex items-center justify-between border-b border-slate-800">
           <div>
             <h2 className="text-xl font-bold">Menu</h2>
           </div>
           <button onClick={toggleMobileMenu} className="p-2 bg-slate-800 text-white rounded-lg">
             <X size={20} />
           </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navs.map((n) => {
            const Icon = n.icon;
            const active = location.pathname === n.path;
            return (
              <Link
                key={n.path}
                to={n.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  active ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {n.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition text-left"
          >
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div onClick={toggleMobileMenu} className="fixed inset-0 bg-black/50 z-30 md:hidden" />
        )}
        <Outlet />
      </main>
    </div>
  );
}
