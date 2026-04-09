import { useState, useMemo } from 'react';
import {
<<<<<<< HEAD
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
=======
  TableCell,
  TableHead,
>>>>>>> e4904b7e (Update data aplikasi)
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
<<<<<<< HEAD
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
=======
>>>>>>> e4904b7e (Update data aplikasi)
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
<<<<<<< HEAD
=======
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
>>>>>>> e4904b7e (Update data aplikasi)
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
<<<<<<< HEAD
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  FileSpreadsheet, 
  FileText, 
=======
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileSpreadsheet,
  FileText,
>>>>>>> e4904b7e (Update data aplikasi)
  Printer,
  Filter,
  ChevronLeft,
  ChevronRight,
<<<<<<< HEAD
=======
  MoreHorizontal,
  Eye,
>>>>>>> e4904b7e (Update data aplikasi)
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ExportService from '@/services/exportService';
import type { Division, Perencanaan, Pengawasan, Administrasi, TenagaAhli } from '@/types';

<<<<<<< HEAD
=======
type PreviewItem = Perencanaan | Pengawasan | Administrasi | TenagaAhli;

>>>>>>> e4904b7e (Update data aplikasi)
interface DataTableProps {
  division: Division;
  data: (Perencanaan | Pengawasan | Administrasi | TenagaAhli)[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
<<<<<<< HEAD
=======
  onSync?: () => Promise<void>;
  sheetConfigured?: boolean;
  syncInProgress?: boolean;
>>>>>>> e4904b7e (Update data aplikasi)
}

const ITEMS_PER_PAGE = 10;

export default function DataTable({ 
  division, 
  data, 
  onAdd, 
  onEdit, 
<<<<<<< HEAD
  onDelete 
}: DataTableProps) {
  const { hasPermission } = useAuth();
=======
  onDelete, 
  onSync, 
  sheetConfigured,
  syncInProgress,
}: DataTableProps) {
  const { hasPermission } = useAuth();
  const canCreate = hasPermission('create', division);
  const canEdit = hasPermission('edit', division);
  const canDelete = hasPermission('delete', division);
>>>>>>> e4904b7e (Update data aplikasi)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tahunFilter, setTahunFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
<<<<<<< HEAD
=======
  const [selectedPreview, setSelectedPreview] = useState<PreviewItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleClosePreview = () => {
    setSelectedPreview(null);
    setPreviewOpen(false);
  };
>>>>>>> e4904b7e (Update data aplikasi)

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    data.forEach((item: any) => {
      if (item.tanggalMulai) {
        years.add(new Date(item.tanggalMulai).getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      // Search filter
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const searchableFields = Object.values(item).map(v => String(v).toLowerCase());
        if (!searchableFields.some(field => field.includes(search))) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && item.statusKontrak) {
        if (item.statusKontrak !== statusFilter) return false;
      }

      // Year filter
      if (tahunFilter !== 'all' && item.tanggalMulai) {
        const year = new Date(item.tanggalMulai).getFullYear().toString();
        if (year !== tahunFilter) return false;
      }

      return true;
    });
  }, [data, searchQuery, statusFilter, tahunFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
<<<<<<< HEAD
    if (itemToDelete) {
      onDelete(itemToDelete);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
=======
    if (!itemToDelete) return;

    onDelete(itemToDelete);
    if (selectedPreview?.id === itemToDelete) {
      setSelectedPreview(null);
    }

    setDeleteDialogOpen(false);
    setItemToDelete(null);
>>>>>>> e4904b7e (Update data aplikasi)
  };

  const handleExportPDF = () => {
    const title = division.charAt(0).toUpperCase() + division.slice(1);
    ExportService.exportToPDF(filteredData, `Data ${title}`, `${division}_export`);
  };

  const handleExportExcel = () => {
    const title = division.charAt(0).toUpperCase() + division.slice(1);
    ExportService.exportToExcel(filteredData, title, `${division}_export`);
  };

  const handlePrint = () => {
    const title = division.charAt(0).toUpperCase() + division.slice(1);
    ExportService.printReport(filteredData, `Data ${title}`);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Aktif': 'bg-green-100 text-green-700 border-green-200',
      'Selesai': 'bg-blue-100 text-blue-700 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Batal': 'bg-red-100 text-red-700 border-red-200',
      'On Track': 'bg-green-100 text-green-700 border-green-200',
      'Delay': 'bg-red-100 text-red-700 border-red-200',
      'Complete': 'bg-blue-100 text-blue-700 border-blue-200',
      'On Hold': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // Render table headers based on division
  const renderHeaders = () => {
    if (division === 'tenagaahli') {
      return (
        <>
          <TableHead className="w-12">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Gelar 1</TableHead>
          <TableHead>Gelar 2</TableHead>
          <TableHead className="w-24">Thn Lulus G1</TableHead>
          <TableHead className="w-24">Thn Lulus G2</TableHead>
          <TableHead>SKA</TableHead>
          <TableHead>Tgl Terbit</TableHead>
          <TableHead>Tgl Berakhir</TableHead>
          <TableHead>Terkait Pekerjaan</TableHead>
          <TableHead className="w-20">Aksi</TableHead>
        </>
      );
    }

    return (
      <>
        <TableHead className="w-12">No</TableHead>
        <TableHead>Pekerjaan</TableHead>
        <TableHead>Owner/Pemberi Kerja</TableHead>
        <TableHead>PIC</TableHead>
        <TableHead>Nilai Kontrak</TableHead>
        <TableHead>Status Termin</TableHead>
        <TableHead>Tgl Mulai</TableHead>
        <TableHead>Tgl Berakhir</TableHead>
        <TableHead className="w-16">Personil Ktr</TableHead>
        <TableHead>Posisi Ktr</TableHead>
        <TableHead className="w-16">Personil Real</TableHead>
        <TableHead>Posisi Real</TableHead>
        <TableHead>Status Ktr</TableHead>
        <TableHead>Status Real</TableHead>
        <TableHead className="w-24">Progress</TableHead>
        <TableHead className="w-20">Aksi</TableHead>
      </>
    );
  };

  // Render table rows based on division
  const renderRow = (item: any) => {
    if (division === 'tenagaahli') {
      const ta = item as TenagaAhli;
      return (
        <>
          <TableCell className="font-medium">{ta.no}</TableCell>
<<<<<<< HEAD
          <TableCell className="font-semibold">{ta.nama}</TableCell>
=======
          <TableCell className="font-semibold">
            <button
              type="button"
              className="text-left text-blue-600 hover:text-blue-700 transition-colors"
              onClick={() => {
                setSelectedPreview(ta);
                setPreviewOpen(true);
              }}
            >
              {ta.nama}
            </button>
          </TableCell>
>>>>>>> e4904b7e (Update data aplikasi)
          <TableCell>{ta.gelar1}</TableCell>
          <TableCell>{ta.gelar2}</TableCell>
          <TableCell>{ta.tahunLulusGelar1}</TableCell>
          <TableCell>{ta.tahunLulusGelar2}</TableCell>
          <TableCell className="font-mono text-xs">{ta.ska}</TableCell>
          <TableCell>{formatDate(ta.tanggalTerbitSKA)}</TableCell>
          <TableCell>{formatDate(ta.tanggalBerakhirSKA)}</TableCell>
          <TableCell>{ta.terkaitPekerjaan}</TableCell>
<<<<<<< HEAD
=======
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => {
                  setSelectedPreview(ta);
                  setPreviewOpen(true);
                }}>
                  <Eye className="w-4 h-4" /> Lihat Detail
                </DropdownMenuItem>
                {canEdit && (
                  <DropdownMenuItem onSelect={() => onEdit(ta)}>
                    <Edit2 className="w-4 h-4" /> Edit
                  </DropdownMenuItem>
                )}
                {canDelete && (
                  <DropdownMenuItem variant="destructive" onSelect={() => handleDeleteClick(ta.id)}>
                    <Trash2 className="w-4 h-4" /> Hapus
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
>>>>>>> e4904b7e (Update data aplikasi)
        </>
      );
    }

    const pekerjaan = item as Perencanaan | Pengawasan | Administrasi;
    return (
      <>
        <TableCell className="font-medium">{pekerjaan.no}</TableCell>
        <TableCell className="font-semibold max-w-xs truncate" title={pekerjaan.pekerjaan}>
<<<<<<< HEAD
          {pekerjaan.pekerjaan}
=======
          <button
            type="button"
            className="text-left text-blue-600 hover:text-blue-700 transition-colors w-full text-left"
            onClick={() => {
              setSelectedPreview(pekerjaan);
              setPreviewOpen(true);
            }}
          >
            {pekerjaan.pekerjaan}
          </button>
>>>>>>> e4904b7e (Update data aplikasi)
        </TableCell>
        <TableCell>{pekerjaan.owner}</TableCell>
        <TableCell>{pekerjaan.pic}</TableCell>
        <TableCell className="font-mono">{formatCurrency(pekerjaan.nilaiKontrak)}</TableCell>
        <TableCell>
          <Badge variant="outline" className="text-xs">{pekerjaan.statusTermin}</Badge>
        </TableCell>
        <TableCell>{formatDate(pekerjaan.tanggalMulai)}</TableCell>
        <TableCell>{formatDate(pekerjaan.tanggalBerakhir)}</TableCell>
        <TableCell className="text-center">{pekerjaan.personilKontrak}</TableCell>
        <TableCell className="max-w-xs truncate">{pekerjaan.posisiKontrak}</TableCell>
        <TableCell className="text-center">{pekerjaan.personilReal}</TableCell>
        <TableCell className="max-w-xs truncate">{pekerjaan.posisiReal}</TableCell>
        <TableCell>
          <Badge variant="outline" className={`text-xs ${getStatusColor(pekerjaan.statusKontrak)}`}>
            {pekerjaan.statusKontrak}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className={`text-xs ${getStatusColor(pekerjaan.statusReal)}`}>
            {pekerjaan.statusReal}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Progress value={pekerjaan.progress} className="h-2 w-16" />
            <span className="text-xs text-slate-500">{pekerjaan.progress}%</span>
          </div>
        </TableCell>
      </>
    );
  };

  const divisionTitle = {
<<<<<<< HEAD
    perencanaan: 'Perencanaan',
    pengawasan: 'Pengawasan',
    administrasi: 'Administrasi',
    tenagaahli: 'Tenaga Ahli',
=======
    perencanaan: 'PERENCANAAN',
    pengawasan: 'PENGAWASAN',
    administrasi: 'ADMINISTRASI',
    tenagaahli: 'PERSONIL',
>>>>>>> e4904b7e (Update data aplikasi)
  }[division];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{divisionTitle}</h2>
          <p className="text-slate-500">Kelola data {divisionTitle.toLowerCase()}</p>
        </div>
<<<<<<< HEAD
        <div className="flex items-center gap-2">
          {hasPermission('create', division) && (
=======
        <div className="flex flex-wrap items-center gap-2">
          {hasPermission('export', division) && (
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          )}
          {canCreate && (
>>>>>>> e4904b7e (Update data aplikasi)
            <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Data
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400" />
          <Input
            placeholder="Cari data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white"
          />
        </div>

        {division !== 'tenagaahli' && (
          <>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Batal">Batal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tahunFilter} onValueChange={setTahunFilter}>
              <SelectTrigger className="w-[150px] bg-white">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tahun</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

<<<<<<< HEAD
        <div className="flex items-center gap-2 ml-auto">
=======
        <div className="flex flex-col gap-2 ml-auto text-right">
          {onSync && (
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={onSync}
                disabled={!sheetConfigured || syncInProgress}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {syncInProgress ? 'Menyinkron...' : 'Sinkron Spreadsheet'}
              </Button>
            </div>
          )}
          <p className="text-xs text-slate-500">
            Sinkronisasi saat ini hanya membaca data dari Google Sheets; perubahan lokal tidak otomatis ditulis kembali ke sheet.
          </p>
>>>>>>> e4904b7e (Update data aplikasi)
          {hasPermission('export', division) && (
            <>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Table */}
      <div className="border rounded-lg bg-white">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="bg-slate-50">
                {renderHeaders()}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={division === 'tenagaahli' ? 11 : 16} 
                    className="text-center py-12 text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 text-slate-300" />
                      <p>Tidak ada data ditemukan</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-slate-50">
                    {renderRow(item)}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {hasPermission('edit', division) && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {hasPermission('delete', division) && (
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(item.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

=======
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="h-[520px] w-full overflow-x-auto">
          <div className="min-w-full sm:min-w-[900px] md:min-w-[1000px] lg:min-w-[1200px]">
            <table className="min-w-full sm:min-w-[900px] md:min-w-[1000px] lg:min-w-[1200px] table-auto w-full border-separate border-spacing-0">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="bg-slate-50">
                  {renderHeaders()}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <TableCell 
                      colSpan={division === 'tenagaahli' ? 11 : 16} 
                      className="text-center py-12 text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 text-slate-300" />
                        <p>Tidak ada data ditemukan</p>
                      </div>
                    </TableCell>
                  </tr>
                ) : (
                  paginatedData.map((item: any) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      {renderRow(item)}
                      {division !== 'tenagaahli' && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                                <MoreHorizontal className="w-5 h-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => {
                                setSelectedPreview(item);
                                setPreviewOpen(true);
                              }}>
                                <Eye className="w-4 h-4" /> Lihat Detail
                              </DropdownMenuItem>
                              {canEdit && (
                                <DropdownMenuItem onSelect={() => onEdit(item)}>
                                  <Edit2 className="w-4 h-4" /> Edit
                                </DropdownMenuItem>
                              )}
                              {canDelete && (
                                <DropdownMenuItem variant="destructive" onSelect={() => handleDeleteClick(item.id)}>
                                  <Trash2 className="w-4 h-4" /> Hapus
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={(open) => {
        if (!open) handleClosePreview();
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPreview ? ('pekerjaan' in selectedPreview ? selectedPreview.pekerjaan : selectedPreview.nama) : 'Detail Data'}
            </DialogTitle>
            <DialogDescription>
              {selectedPreview ? ('pekerjaan' in selectedPreview ? selectedPreview.owner : selectedPreview.ska) : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedPreview ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {canCreate && (
                  <Button size="sm" variant="outline" onClick={onAdd}>
                    Tambah Data
                  </Button>
                )}
                {canEdit && (
                  <Button size="sm" onClick={() => onEdit(selectedPreview)}>
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(selectedPreview.id)}>
                    Hapus
                  </Button>
                )}
              </div>
              {'pekerjaan' in selectedPreview ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Pekerjaan</p>
                      <p className="font-semibold text-slate-800">{selectedPreview.pekerjaan}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Owner / Pemberi Kerja</p>
                      <p className="font-semibold text-slate-800">{selectedPreview.owner}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Tanggal Mulai Kontrak</p>
                      <p className="font-semibold text-slate-800">{formatDate(selectedPreview.tanggalMulai)}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Tanggal Berakhir Kontrak</p>
                      <p className="font-semibold text-slate-800">{formatDate(selectedPreview.tanggalBerakhir)}</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">NO</th>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">Personil Kontrak</th>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">Posisi Kontrak</th>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">Personil Real</th>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">Posisi Real</th>
                          <th className="px-3 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide">Progress</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr className="border-t border-slate-200 hover:bg-slate-50">
                          <td className="px-3 py-4 align-top font-medium">1</td>
                          <td className="px-3 py-4 align-top">{selectedPreview.personilKontrak}</td>
                          <td className="px-3 py-4 align-top whitespace-pre-line">{selectedPreview.posisiKontrak}</td>
                          <td className="px-3 py-4 align-top whitespace-pre-line">{selectedPreview.personilReal}</td>
                          <td className="px-3 py-4 align-top whitespace-pre-line">{selectedPreview.posisiReal}</td>
                          <td className="px-3 py-4 align-top">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{selectedPreview.progress}%</span>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${selectedPreview.progress}%` }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-500">Gelar</p>
                      <p className="font-semibold text-slate-800">{selectedPreview.gelar1} / {selectedPreview.gelar2}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">SKA</p>
                        <p className="font-semibold text-slate-800">{selectedPreview.ska}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Terkait Pekerjaan</p>
                        <p className="font-semibold text-slate-800">{selectedPreview.terkaitPekerjaan}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Terbit SKA</p>
                        <p className="font-semibold text-slate-800">{formatDate(selectedPreview.tanggalTerbitSKA)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs text-slate-500">Berakhir SKA</p>
                        <p className="font-semibold text-slate-800">{formatDate(selectedPreview.tanggalBerakhirSKA)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <p className="text-lg font-semibold">Tidak ada data yang dipilih.</p>
              <p className="mt-2">Klik nama pekerjaan atau personil pada tabel untuk membuka detail.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleClosePreview}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

>>>>>>> e4904b7e (Update data aplikasi)
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} dari {filteredData.length} data
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-slate-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> e4904b7e (Update data aplikasi)
