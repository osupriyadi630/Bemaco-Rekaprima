// User Roles
export type UserRole = 'admin_super' | 'manajemen' | 'admin' | 'member';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email?: string;
}

// Status types
export type StatusKontrak = 'Aktif' | 'Selesai' | 'Pending' | 'Batal';
export type StatusTermin = 'Termin 1' | 'Termin 2' | 'Termin 3' | 'Termin 4' | 'Lunas';
export type StatusReal = 'On Track' | 'Delay' | 'Complete' | 'On Hold';

// Base Pekerjaan interface
export interface BasePekerjaan {
  id: string;
  no: number;
  pekerjaan: string;
  owner: string;
  pic: string;
  nilaiKontrak: number;
  statusTermin: StatusTermin;
  tanggalMulai: string;
  tanggalBerakhir: string;
  personilKontrak: number;
  posisiKontrak: string;
  personilReal: number;
  posisiReal: string;
  statusKontrak: StatusKontrak;
  statusReal: StatusReal;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

// Division-specific interfaces
export interface Perencanaan extends BasePekerjaan {}
export interface Pengawasan extends BasePekerjaan {}
export interface Administrasi extends BasePekerjaan {}

// Tenaga Ahli interface
export interface TenagaAhli {
  id: string;
  no: number;
  nama: string;
  gelar1: string;
  gelar2: string;
  tahunLulusGelar1: number;
  tahunLulusGelar2: number;
  ska: string;
  tanggalTerbitSKA: string;
  tanggalBerakhirSKA: string;
  terkaitPekerjaan: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Summary
export interface DashboardSummary {
  totalPekerjaan: number;
  pekerjaanAktif: number;
  pekerjaanSelesai: number;
  totalNilaiKontrak: number;
  pekerjaanTerbaru: BasePekerjaan[];
  pekerjaanAkanBerakhir: BasePekerjaan[];
  tenagaAhliTeraktif: TenagaAhliAktif[];
}

export interface TenagaAhliAktif {
  nama: string;
  jumlahPekerjaan: number;
  posisi: string;
}

// Filter options
export interface FilterOptions {
  bulan?: number;
  tahun?: number;
  status?: string;
  search?: string;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Division type
export type Division = 'perencanaan' | 'pengawasan' | 'administrasi' | 'tenagaahli';

// Permission mapping
export const PERMISSIONS = {
  admin_super: {
    canView: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli', 'code_access'],
    canCreate: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canEdit: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canDelete: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canExport: true,
    canPrint: true,
    canAccessCode: true,
  },
  manajemen: {
    canView: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canCreate: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canEdit: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canDelete: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canExport: true,
    canPrint: true,
    canAccessCode: false,
  },
  admin: {
    canView: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canCreate: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canEdit: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canDelete: ['perencanaan', 'pengawasan', 'administrasi', 'tenagaahli'],
    canExport: true,
    canPrint: true,
    canAccessCode: false,
  },
  member: {
    canView: ['perencanaan', 'pengawasan'], // Hanya bisa lihat Perencanaan dan Pengawasan
    canCreate: [],
    canEdit: [],
    canDelete: [],
    canExport: false,
    canPrint: false,
    canAccessCode: false,
  },
};
