import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'sonner';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import DataService from '@/services/dataService';
import Login from '@/components/Login';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import DataTable from '@/components/DataTable';
import FormDialog from '@/components/FormDialog';
import CodeAccess from '@/components/CodeAccess';
import './App.css';
import type { Division, Perencanaan, Pengawasan, Administrasi, TenagaAhli } from '@/types';

// Main App Content Component
function AppContent() {
  const { isAuthenticated, logout, user, hasPermission } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  const [data, setData] = useState<(Perencanaan | Pengawasan | Administrasi | TenagaAhli)[]>([]);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Load data based on active view
  const loadData = useCallback(() => {
    if (['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'].includes(activeView)) {
      const division = activeView as Division;
      const newData = DataService.getAll<Perencanaan | Pengawasan | Administrasi | TenagaAhli>(division);
      setData(newData);
    }
  }, [activeView]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setActiveView('dashboard');
    toast.success('Berhasil keluar dari sistem');
  };

  // Handle add new data
  function handleAdd() {
    if (!hasPermission('create', activeView as Division)) {
      toast.error('Anda tidak memiliki izin untuk menambah data');
      return;
    }
    setFormMode('add');
    setSelectedItem(null);
    setFormDialogOpen(true);
  }

  // Handle edit data
  const handleEdit = (item: any) => {
    if (!hasPermission('edit', activeView as Division)) {
      toast.error('Anda tidak memiliki izin untuk mengedit data');
      return;
    }
    setFormMode('edit');
    setSelectedItem(item);
    setFormDialogOpen(true);
  };

  // Handle delete data
  const handleDelete = (id: string) => {
    if (!hasPermission('delete', activeView as Division)) {
      toast.error('Anda tidak memiliki izin untuk menghapus data');
      return;
    }
    const division = activeView as Division;
    const success = DataService.delete(division, id);
    if (success) {
      toast.success('Data berhasil dihapus');
      loadData();
    } else {
      toast.error('Gagal menghapus data');
    }
  };

  // Handle form submit
  const handleFormSubmit = (formData: any) => {
    const division = activeView as Division;
    
    if (formMode === 'add') {
      // Generate next number
      const existingData = DataService.getAll(division);
      const nextNo = existingData.length > 0 
        ? Math.max(...existingData.map((d: any) => d.no)) + 1 
        : 1;
      
      DataService.create(division, { ...formData, no: nextNo });
      toast.success('Data berhasil ditambahkan');
    } else {
      if (selectedItem) {
        DataService.update(division, selectedItem.id, formData);
        toast.success('Data berhasil diperbarui');
      }
    }
    
    setFormDialogOpen(false);
    loadData();
  };

  // Render main content based on active view
  const renderContent = () => {
    // Check permission for division views
    if (['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'].includes(activeView)) {
      const division = activeView as Division;
      if (!hasPermission('view', division)) {
        return (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Akses Ditolak</h2>
            <p className="text-slate-500 text-center max-w-md">
              Anda tidak memiliki izin untuk mengakses halaman ini. 
              Silakan hubungi administrator untuk informasi lebih lanjut.
            </p>
          </div>
        );
      }

      return (
        <>
          <DataTable
            division={division}
            data={data}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <FormDialog
            isOpen={formDialogOpen}
            onClose={() => setFormDialogOpen(false)}
            onSubmit={handleFormSubmit}
            division={division}
            initialData={selectedItem}
            mode={formMode}
          />
        </>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'code_access':
        if (user?.role !== 'admin_super') {
          return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Akses Ditolak</h2>
              <p className="text-slate-500 text-center max-w-md">
                Hanya Admin Super yang dapat mengakses halaman ini.
              </p>
            </div>
          );
        }
        return <CodeAccess />;
      case 'laporan':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Laporan</h2>
            <p className="text-slate-500 text-center max-w-md">
              Fitur laporan akan segera hadir.
            </p>
          </div>
        );
      case 'pengaturan':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Pengaturan Google Sheets</h2>
                  <p className="text-slate-500 mt-1">Hubungkan aplikasi ke Google Sheets dengan Spreadsheet ID dan API Key.</p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Spreadsheet ID</label>
                  <Input
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                    placeholder="16G63mDpRwdnzrD1vu9vwpVCgnzs_PDTLOB342AmSu4c"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-700">Google API Key</label>
                  <Input
                    value={sheetApiKey}
                    onChange={(e) => setSheetApiKey(e.target.value)}
                    placeholder="Masukkan API key"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleSaveSheetConfig}>Simpan Konfigurasi</Button>
                  <Button
                    variant="outline"
                    onClick={handleSyncAll}
                    disabled={!sheetId || !sheetApiKey || isSheetSyncing}
                  >
                    {isSheetSyncing ? 'Menyinkron...' : 'Sinkron Semua Divisi'}
                  </Button>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">
                    Spreadsheet ID default sudah diisi sesuai link yang Anda berikan. Pastikan sheet ini memiliki tab bernama
                    "Perencanaan", "Pengawasan", "Administrasi", dan "PERSONIL" agar sinkronisasi berjalan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // If not authenticated, show login
  if (!isAuthenticated) {
    return (
      <>
        <Login onLoginSuccess={() => toast.success('Selamat datang!')} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLogout={handleLogout} />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

// Main App Component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
