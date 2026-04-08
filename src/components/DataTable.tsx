import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  FileSpreadsheet, 
  FileText, 
  Printer,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ExportService from '@/services/exportService';
import type { Division, Perencanaan, Pengawasan, Administrasi, TenagaAhli } from '@/types';

interface DataTableProps {
  division: Division;
  data: (Perencanaan | Pengawasan | Administrasi | TenagaAhli)[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

export default function DataTable({ 
  division, 
  data, 
  onAdd, 
  onEdit, 
  onDelete 
}: DataTableProps) {
  const { hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tahunFilter, setTahunFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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
    if (itemToDelete) {
      onDelete(itemToDelete);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
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
          <TableCell className="font-semibold">{ta.nama}</TableCell>
          <TableCell>{ta.gelar1}</TableCell>
          <TableCell>{ta.gelar2}</TableCell>
          <TableCell>{ta.tahunLulusGelar1}</TableCell>
          <TableCell>{ta.tahunLulusGelar2}</TableCell>
          <TableCell className="font-mono text-xs">{ta.ska}</TableCell>
          <TableCell>{formatDate(ta.tanggalTerbitSKA)}</TableCell>
          <TableCell>{formatDate(ta.tanggalBerakhirSKA)}</TableCell>
          <TableCell>{ta.terkaitPekerjaan}</TableCell>
        </>
      );
    }

    const pekerjaan = item as Perencanaan | Pengawasan | Administrasi;
    return (
      <>
        <TableCell className="font-medium">{pekerjaan.no}</TableCell>
        <TableCell className="font-semibold max-w-xs truncate" title={pekerjaan.pekerjaan}>
          {pekerjaan.pekerjaan}
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
    perencanaan: 'Perencanaan',
    pengawasan: 'Pengawasan',
    administrasi: 'Administrasi',
    tenagaahli: 'Tenaga Ahli',
  }[division];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{divisionTitle}</h2>
          <p className="text-slate-500">Kelola data {divisionTitle.toLowerCase()}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasPermission('create', division) && (
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

        <div className="flex items-center gap-2 ml-auto">
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
