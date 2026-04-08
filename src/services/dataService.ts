import type { 
  Perencanaan, 
  Pengawasan, 
  Administrasi, 
  TenagaAhli, 
  BasePekerjaan,
  DashboardSummary,
  FilterOptions 
} from '@/types';

// Google Sheets Configuration
const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: localStorage.getItem('sheets_config_id') || '',
  apiKey: localStorage.getItem('sheets_config_api_key') || '',
};

// Local storage keys
const STORAGE_KEYS = {
  perencanaan: 'bemaco_perencanaan',
  pengawasan: 'bemaco_pengawasan',
  administrasi: 'bemaco_administrasi',
  tenagaahli: 'bemaco_tenagaahli',
};

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Get current timestamp
const getTimestamp = () => new Date().toISOString();

// Initialize with sample data if empty
const initializeData = () => {
  const samplePerencanaan: Perencanaan[] = [
    {
      id: generateId(),
      no: 1,
      pekerjaan: 'Konsultansi Perencanaan Jalan Tol',
      owner: 'PT. Waskita Karya',
      pic: 'Budi Santoso',
      nilaiKontrak: 2500000000,
      statusTermin: 'Termin 2',
      tanggalMulai: '2024-01-15',
      tanggalBerakhir: '2025-01-14',
      personilKontrak: 8,
      posisiKontrak: 'Manager, Engineer, Drafter',
      personilReal: 7,
      posisiReal: 'Manager, Engineer, Drafter',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 65,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 2,
      pekerjaan: 'DED Gedung Perkantoran',
      owner: 'PT. Pembangunan Perumahan',
      pic: 'Ahmad Rizal',
      nilaiKontrak: 1800000000,
      statusTermin: 'Termin 1',
      tanggalMulai: '2024-03-01',
      tanggalBerakhir: '2024-12-31',
      personilKontrak: 5,
      posisiKontrak: 'Arsitek, Struktur, MEP',
      personilReal: 5,
      posisiReal: 'Arsitek, Struktur, MEP',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 40,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 3,
      pekerjaan: 'Master Plan Kawasan Industri',
      owner: 'PT. Kawasan Industri Jababeka',
      pic: 'Siti Nurhaliza',
      nilaiKontrak: 3200000000,
      statusTermin: 'Termin 3',
      tanggalMulai: '2023-06-01',
      tanggalBerakhir: '2024-05-31',
      personilKontrak: 12,
      posisiKontrak: 'Planner, Arsitek, Surveyor',
      personilReal: 10,
      posisiReal: 'Planner, Arsitek, Surveyor',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 85,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
  ];

  const samplePengawasan: Pengawasan[] = [
    {
      id: generateId(),
      no: 1,
      pekerjaan: 'Pengawasan Pembangunan Jembatan',
      owner: 'Dinas PUPR Provinsi',
      pic: 'Dedi Kurniawan',
      nilaiKontrak: 1500000000,
      statusTermin: 'Termin 2',
      tanggalMulai: '2024-02-01',
      tanggalBerakhir: '2024-11-30',
      personilKontrak: 6,
      posisiKontrak: 'Site Manager, QC, Safety',
      personilReal: 6,
      posisiReal: 'Site Manager, QC, Safety',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 55,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 2,
      pekerjaan: 'Supervisi Konstruksi Gedung',
      owner: 'PT. Agung Podomoro',
      pic: 'Eko Prasetyo',
      nilaiKontrak: 2100000000,
      statusTermin: 'Termin 1',
      tanggalMulai: '2024-04-01',
      tanggalBerakhir: '2025-03-31',
      personilKontrak: 8,
      posisiKontrak: 'Supervisor, Inspector',
      personilReal: 7,
      posisiReal: 'Supervisor, Inspector',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 25,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
  ];

  const sampleAdministrasi: Administrasi[] = [
    {
      id: generateId(),
      no: 1,
      pekerjaan: 'Manajemen Dokumen Proyek',
      owner: 'PT. Total Bangun Persada',
      pic: 'Fani Wulandari',
      nilaiKontrak: 800000000,
      statusTermin: 'Termin 2',
      tanggalMulai: '2024-01-01',
      tanggalBerakhir: '2024-12-31',
      personilKontrak: 4,
      posisiKontrak: 'Admin, Document Control',
      personilReal: 4,
      posisiReal: 'Admin, Document Control',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 70,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
  ];

  const sampleTenagaAhli: TenagaAhli[] = [
    {
      id: generateId(),
      no: 1,
      nama: 'Ir. Budi Santoso, M.T.',
      gelar1: 'Sipil',
      gelar2: 'Manajemen Konstruksi',
      tahunLulusGelar1: 2005,
      tahunLulusGelar2: 2010,
      ska: 'SKA-001/Sipil/M/T/2024',
      tanggalTerbitSKA: '2024-01-15',
      tanggalBerakhirSKA: '2027-01-14',
      terkaitPekerjaan: 'Konsultansi Perencanaan Jalan Tol',
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 2,
      nama: 'Ir. Ahmad Rizal, M.Ars.',
      gelar1: 'Arsitektur',
      gelar2: 'Arsitektur Lansekap',
      tahunLulusGelar1: 2008,
      tahunLulusGelar2: 2012,
      ska: 'SKA-002/Ars/M/T/2024',
      tanggalTerbitSKA: '2024-02-01',
      tanggalBerakhirSKA: '2027-01-31',
      terkaitPekerjaan: 'DED Gedung Perkantoran',
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 3,
      nama: 'Ir. Siti Nurhaliza, M.T.',
      gelar1: 'Perencanaan Wilayah dan Kota',
      gelar2: 'Transportasi',
      tahunLulusGelar1: 2010,
      tahunLulusGelar2: 2014,
      ska: 'SKA-003/PWK/M/T/2024',
      tanggalTerbitSKA: '2024-03-15',
      tanggalBerakhirSKA: '2027-03-14',
      terkaitPekerjaan: 'Master Plan Kawasan Industri',
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 4,
      nama: 'Ir. Dedi Kurniawan, M.T.',
      gelar1: 'Sipil',
      gelar2: 'Struktur',
      tahunLulusGelar1: 2006,
      tahunLulusGelar2: 2009,
      ska: 'SKA-004/Sipil/M/T/2024',
      tanggalTerbitSKA: '2024-01-20',
      tanggalBerakhirSKA: '2027-01-19',
      terkaitPekerjaan: 'Pengawasan Pembangunan Jembatan',
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
    {
      id: generateId(),
      no: 5,
      nama: 'Ir. Eko Prasetyo, M.T.',
      gelar1: 'Sipil',
      gelar2: 'Manajemen Proyek',
      tahunLulusGelar1: 2012,
      tahunLulusGelar2: 2015,
      ska: 'SKA-005/Sipil/M/T/2024',
      tanggalTerbitSKA: '2024-04-01',
      tanggalBerakhirSKA: '2027-03-31',
      terkaitPekerjaan: 'Supervisi Konstruksi Gedung',
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    },
  ];

  if (!localStorage.getItem(STORAGE_KEYS.perencanaan)) {
    localStorage.setItem(STORAGE_KEYS.perencanaan, JSON.stringify(samplePerencanaan));
  }
  if (!localStorage.getItem(STORAGE_KEYS.pengawasan)) {
    localStorage.setItem(STORAGE_KEYS.pengawasan, JSON.stringify(samplePengawasan));
  }
  if (!localStorage.getItem(STORAGE_KEYS.administrasi)) {
    localStorage.setItem(STORAGE_KEYS.administrasi, JSON.stringify(sampleAdministrasi));
  }
  if (!localStorage.getItem(STORAGE_KEYS.tenagaahli)) {
    localStorage.setItem(STORAGE_KEYS.tenagaahli, JSON.stringify(sampleTenagaAhli));
  }
};

// Initialize data
initializeData();

// Generic CRUD operations
class DataService {
  // Get all data from a division
  static getAll<T>(division: keyof typeof STORAGE_KEYS): T[] {
    const data = localStorage.getItem(STORAGE_KEYS[division]);
    return data ? JSON.parse(data) : [];
  }

  // Get data by ID
  static getById<T extends { id: string }>(division: keyof typeof STORAGE_KEYS, id: string): T | null {
    const data = this.getAll<T>(division);
    return data.find(item => item.id === id) || null;
  }

  // Create new data
  static create<T extends object>(division: keyof typeof STORAGE_KEYS, item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const data = this.getAll<T>(division);
    const newItem = {
      ...item,
      id: generateId(),
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    } as T;
    
    data.push(newItem);
    localStorage.setItem(STORAGE_KEYS[division], JSON.stringify(data));
    return newItem;
  }

  // Update data
  static update<T extends { id: string }>(division: keyof typeof STORAGE_KEYS, id: string, updates: Partial<T>): T | null {
    const data = this.getAll<T>(division);
    const index = data.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    data[index] = {
      ...data[index],
      ...updates,
      updatedAt: getTimestamp(),
    };
    
    localStorage.setItem(STORAGE_KEYS[division], JSON.stringify(data));
    return data[index];
  }

  // Delete data
  static delete<T extends { id: string }>(division: keyof typeof STORAGE_KEYS, id: string): boolean {
    const data = this.getAll<T>(division);
    const filtered = data.filter(item => item.id !== id);
    
    if (filtered.length === data.length) return false;
    
    localStorage.setItem(STORAGE_KEYS[division], JSON.stringify(filtered));
    return true;
  }

  // Filter data
  static filter<T extends BasePekerjaan | TenagaAhli>(
    division: keyof typeof STORAGE_KEYS, 
    options: FilterOptions
  ): T[] {
    let data = this.getAll<T>(division);
    
    if (options.search) {
      const search = options.search.toLowerCase();
      data = data.filter((item: any) => {
        return Object.values(item).some(val => 
          String(val).toLowerCase().includes(search)
        );
      });
    }
    
    if (options.status && 'statusKontrak' in (data[0] || {})) {
      data = data.filter((item: any) => item.statusKontrak === options.status);
    }
    
    if (options.tahun && 'tanggalMulai' in (data[0] || {})) {
      data = data.filter((item: any) => {
        const year = new Date(item.tanggalMulai).getFullYear();
        return year === options.tahun;
      });
    }
    
    if (options.bulan && 'tanggalMulai' in (data[0] || {})) {
      data = data.filter((item: any) => {
        const month = new Date(item.tanggalMulai).getMonth() + 1;
        return month === options.bulan;
      });
    }
    
    return data;
  }

  // Get dashboard summary
  static getDashboardSummary(): DashboardSummary {
    const perencanaan = this.getAll<Perencanaan>('perencanaan');
    const pengawasan = this.getAll<Pengawasan>('pengawasan');
    const administrasi = this.getAll<Administrasi>('administrasi');
    
    const allPekerjaan = [...perencanaan, ...pengawasan, ...administrasi];
    
    // Get 3 latest jobs
    const pekerjaanTerbaru = [...allPekerjaan]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    
    // Get 3 jobs ending soon
    const pekerjaanAkanBerakhir = [...allPekerjaan]
      .filter(p => p.statusKontrak === 'Aktif')
      .sort((a, b) => new Date(a.tanggalBerakhir).getTime() - new Date(b.tanggalBerakhir).getTime())
      .slice(0, 3);
    
    // Calculate total contract value
    const totalNilaiKontrak = allPekerjaan.reduce((sum, p) => sum + p.nilaiKontrak, 0);
    
    return {
      totalPekerjaan: allPekerjaan.length,
      pekerjaanAktif: allPekerjaan.filter(p => p.statusKontrak === 'Aktif').length,
      pekerjaanSelesai: allPekerjaan.filter(p => p.statusKontrak === 'Selesai').length,
      totalNilaiKontrak,
      pekerjaanTerbaru,
      pekerjaanAkanBerakhir,
      tenagaAhliTeraktif: [],
    };
  }

  // Export to Excel format
  static exportToExcel<T extends object>(division: keyof typeof STORAGE_KEYS): T[] {
    return this.getAll<T>(division);
  }

  // Sync with Google Sheets (placeholder for future implementation)
  static async syncWithGoogleSheets(division: keyof typeof STORAGE_KEYS): Promise<boolean> {
    // TODO: Implement Google Sheets API integration
    console.log(`Syncing ${division} with Google Sheets...`);
    return true;
  }

  // Configure Google Sheets
  static configureGoogleSheets(spreadsheetId: string, apiKey: string): void {
    localStorage.setItem('sheets_config_id', spreadsheetId);
    localStorage.setItem('sheets_config_api_key', apiKey);
    GOOGLE_SHEETS_CONFIG.spreadsheetId = spreadsheetId;
    GOOGLE_SHEETS_CONFIG.apiKey = apiKey;
  }
}

export default DataService;
