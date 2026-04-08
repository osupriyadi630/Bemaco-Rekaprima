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
  const handleAdd = () => {
    if (!hasPermission('create', activeView as Division)) {
      toast.error('Anda tidak memiliki izin untuk menambah data');
      return;
    }
    setFormMode('add');
    setSelectedItem(null);
    setFormDialogOpen(true);
  };

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
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Pengaturan</h2>
            <p className="text-slate-500 text-center max-w-md">
              Fitur pengaturan akan segera hadir.
            </p>
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
