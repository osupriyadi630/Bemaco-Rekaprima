import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Division } from '@/types';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  division: Division;
  initialData?: any;
  mode: 'add' | 'edit';
}

const STATUS_KONTRAK = ['Aktif', 'Selesai', 'Pending', 'Batal'];
const STATUS_TERMIN = ['Termin 1', 'Termin 2', 'Termin 3', 'Termin 4', 'Lunas'];
const STATUS_REAL = ['On Track', 'Delay', 'Complete', 'On Hold'];

export default function FormDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  division, 
  initialData, 
  mode 
}: FormDialogProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(getInitialFormData(division));
    }
  }, [initialData, division, isOpen]);

  const getInitialFormData = (div: Division) => {
    if (div === 'tenagaahli') {
      return {
        no: 1,
        nama: '',
        gelar1: '',
        gelar2: '',
        tahunLulusGelar1: new Date().getFullYear(),
        tahunLulusGelar2: new Date().getFullYear(),
        ska: '',
        tanggalTerbitSKA: '',
        tanggalBerakhirSKA: '',
        terkaitPekerjaan: '',
      };
    }
    return {
      no: 1,
      pekerjaan: '',
      owner: '',
      pic: '',
      nilaiKontrak: 0,
      statusTermin: 'Termin 1',
      tanggalMulai: '',
      tanggalBerakhir: '',
      personilKontrak: 0,
      posisiKontrak: '',
      personilReal: 0,
      posisiReal: '',
      statusKontrak: 'Aktif',
      statusReal: 'On Track',
      progress: 0,
    };
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const divisionTitle = {
    perencanaan: 'Perencanaan',
    pengawasan: 'Pengawasan',
    administrasi: 'Administrasi',
    tenagaahli: 'Tenaga Ahli',
  }[division];

  // Form for Tenaga Ahli
  if (division === 'tenagaahli') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Tambah' : 'Edit'} Data {divisionTitle}
            </DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk {mode === 'add' ? 'menambahkan' : 'mengubah'} data.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <form onSubmit={handleSubmit} className="space-y-4 p-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="no">No</Label>
                  <Input
                    id="no"
                    type="number"
                    value={formData.no}
                    onChange={(e) => handleChange('no', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleChange('nama', e.target.value)}
                    placeholder="Ir. Nama Lengkap, M.T."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gelar1">Gelar 1</Label>
                  <Input
                    id="gelar1"
                    value={formData.gelar1}
                    onChange={(e) => handleChange('gelar1', e.target.value)}
                    placeholder="Sipil, Arsitektur, dll"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gelar2">Gelar 2</Label>
                  <Input
                    id="gelar2"
                    value={formData.gelar2}
                    onChange={(e) => handleChange('gelar2', e.target.value)}
                    placeholder="Manajemen Konstruksi, dll"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tahunLulusGelar1">Tahun Lulus Gelar 1</Label>
                  <Input
                    id="tahunLulusGelar1"
                    type="number"
                    value={formData.tahunLulusGelar1}
                    onChange={(e) => handleChange('tahunLulusGelar1', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tahunLulusGelar2">Tahun Lulus Gelar 2</Label>
                  <Input
                    id="tahunLulusGelar2"
                    type="number"
                    value={formData.tahunLulusGelar2}
                    onChange={(e) => handleChange('tahunLulusGelar2', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ska">Nomor SKA</Label>
                <Input
                  id="ska"
                  value={formData.ska}
                  onChange={(e) => handleChange('ska', e.target.value)}
                  placeholder="SKA-XXX/Sipil/M/T/2024"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tanggalTerbitSKA">Tanggal Terbit SKA</Label>
                  <Input
                    id="tanggalTerbitSKA"
                    type="date"
                    value={formData.tanggalTerbitSKA}
                    onChange={(e) => handleChange('tanggalTerbitSKA', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalBerakhirSKA">Tanggal Berakhir SKA</Label>
                  <Input
                    id="tanggalBerakhirSKA"
                    type="date"
                    value={formData.tanggalBerakhirSKA}
                    onChange={(e) => handleChange('tanggalBerakhirSKA', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="terkaitPekerjaan">Terkait dengan Pekerjaan</Label>
                <Input
                  id="terkaitPekerjaan"
                  value={formData.terkaitPekerjaan}
                  onChange={(e) => handleChange('terkaitPekerjaan', e.target.value)}
                  placeholder="Nama pekerjaan yang terkait"
                />
              </div>
            </form>
          </ScrollArea>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              {mode === 'add' ? 'Tambah' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Form for Pekerjaan (Perencanaan, Pengawasan, Administrasi)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Tambah' : 'Edit'} Data {divisionTitle}
          </DialogTitle>
          <DialogDescription>
            Isi form di bawah untuk {mode === 'add' ? 'menambahkan' : 'mengubah'} data pekerjaan.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <form onSubmit={handleSubmit} className="space-y-4 p-1">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1 space-y-2">
                <Label htmlFor="no">No</Label>
                <Input
                  id="no"
                  type="number"
                  value={formData.no}
                  onChange={(e) => handleChange('no', parseInt(e.target.value))}
                  required
                />
              </div>
              <div className="col-span-11 space-y-2">
                <Label htmlFor="pekerjaan">Nama Pekerjaan</Label>
                <Input
                  id="pekerjaan"
                  value={formData.pekerjaan}
                  onChange={(e) => handleChange('pekerjaan', e.target.value)}
                  placeholder="Nama pekerjaan/proyek"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Owner/Pemberi Kerja</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => handleChange('owner', e.target.value)}
                  placeholder="Nama perusahaan/instansi"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pic">PIC</Label>
                <Input
                  id="pic"
                  value={formData.pic}
                  onChange={(e) => handleChange('pic', e.target.value)}
                  placeholder="Nama PIC"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nilaiKontrak">Nilai Kontrak (Rp)</Label>
                <Input
                  id="nilaiKontrak"
                  type="number"
                  value={formData.nilaiKontrak}
                  onChange={(e) => handleChange('nilaiKontrak', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusTermin">Status Termin</Label>
                <Select 
                  value={formData.statusTermin} 
                  onValueChange={(value) => handleChange('statusTermin', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_TERMIN.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggalMulai">Tanggal Mulai Kontrak</Label>
                <Input
                  id="tanggalMulai"
                  type="date"
                  value={formData.tanggalMulai}
                  onChange={(e) => handleChange('tanggalMulai', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalBerakhir">Tanggal Berakhir Kontrak</Label>
                <Input
                  id="tanggalBerakhir"
                  type="date"
                  value={formData.tanggalBerakhir}
                  onChange={(e) => handleChange('tanggalBerakhir', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-slate-700 mb-3">Personil Kontrak</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personilKontrak">Jumlah Personil</Label>
                  <Input
                    id="personilKontrak"
                    type="number"
                    value={formData.personilKontrak}
                    onChange={(e) => handleChange('personilKontrak', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="posisiKontrak">Posisi</Label>
                  <Input
                    id="posisiKontrak"
                    value={formData.posisiKontrak}
                    onChange={(e) => handleChange('posisiKontrak', e.target.value)}
                    placeholder="Manager, Engineer, dll"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-slate-700 mb-3">Personil Real</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personilReal">Jumlah Personil</Label>
                  <Input
                    id="personilReal"
                    type="number"
                    value={formData.personilReal}
                    onChange={(e) => handleChange('personilReal', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="posisiReal">Posisi</Label>
                  <Input
                    id="posisiReal"
                    value={formData.posisiReal}
                    onChange={(e) => handleChange('posisiReal', e.target.value)}
                    placeholder="Manager, Engineer, dll"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-slate-700 mb-3">Status</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="statusKontrak">Status Kontrak</Label>
                  <Select 
                    value={formData.statusKontrak} 
                    onValueChange={(value) => handleChange('statusKontrak', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_KONTRAK.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusReal">Status Real</Label>
                  <Select 
                    value={formData.statusReal} 
                    onValueChange={(value) => handleChange('statusReal', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_REAL.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            {mode === 'add' ? 'Tambah' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
