/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { WifiOff } from "lucide-react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import News from "./pages/News";
import Teachers from "./pages/Teachers";
import Facilities from "./pages/Facilities";
import PPDB from "./pages/PPDB";
import AdminLayout from "./pages/admin/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewsAdmin from "./pages/admin/NewsAdmin";
import TeachersAdmin from "./pages/admin/TeachersAdmin";
import FacilitiesAdmin from "./pages/admin/FacilitiesAdmin";
import PPDBAdmin from "./pages/admin/PPDBAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";
import { fetchFromGas } from "./services/api";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchFromGas("get_all_public");
        setData(res);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-600 font-medium">Memuat data sekolah...</p>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        {isOffline && (
          <div className="bg-rose-500 text-white px-4 py-2 text-center text-sm font-semibold flex items-center justify-center gap-2 relative z-50">
            <WifiOff size={16} />
            Anda sedang offline. Menampilkan data yang tersimpan.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Layout settings={data?.settings} seo={data?.seo} />}>
            <Route index element={<Home data={data} />} />
            <Route path="profil" element={<Profile data={data} />} />
            <Route path="berita" element={<News data={data} />} />
            <Route path="guru" element={<Teachers data={data} />} />
            <Route path="fasilitas" element={<Facilities data={data} />} />
            <Route path="ppdb" element={<PPDB />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="berita" element={<NewsAdmin />} />
            <Route path="guru" element={<TeachersAdmin />} />
            <Route path="fasilitas" element={<FacilitiesAdmin />} />
            <Route path="ppdb" element={<PPDBAdmin />} />
            <Route path="pengaturan" element={<SettingsAdmin />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={
            <div className="py-32 text-center text-gray-500">
               <h2 className="text-2xl font-bold mb-2">Halaman tidak ditemukan</h2>
               <a href="/" className="text-indigo-600 hover:underline">Kembali ke Beranda</a>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
