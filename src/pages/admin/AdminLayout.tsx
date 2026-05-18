import { Outlet, Navigate, useNavigate } from "react-router";
import { LogOut, LayoutDashboard, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function AdminLayout() {
  const token = localStorage.getItem("admin_token");
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-1">Sistem Informasi Sekolah</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navs.map((n) => {
            const Icon = n.icon;
            const active = location.pathname === n.path;
            return (
              <Link
                key={n.path}
                to={n.path}
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
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
