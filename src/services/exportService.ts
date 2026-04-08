import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import type { Perencanaan, Pengawasan, Administrasi, TenagaAhli } from '@/types';

class ExportService {
  // Format currency
  private static formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  }

  // Format date
  private static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Export to PDF
  static exportToPDF(
    data: (Perencanaan | Pengawasan | Administrasi | TenagaAhli)[],
    title: string,
    filename: string
  ): void {
    const doc = new jsPDF('l', 'mm', 'a4');
    
    // Add title
    doc.setFontSize(16);
    doc.text('PT. BEMACO REKAPRIMA', 14, 15);
    doc.setFontSize(12);
    doc.text(title, 14, 25);
    doc.setFontSize(10);
    doc.text(`Tanggal Export: ${new Date().toLocaleDateString('id-ID')}`, 14, 32);

    // Determine headers based on data type
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (data.length > 0 && 'nilaiKontrak' in data[0]) {
      // Pekerjaan table (Perencanaan, Pengawasan, Administrasi)
      const pekerjaanData = data as (Perencanaan | Pengawasan | Administrasi)[];
      headers = ['No', 'Pekerjaan', 'Owner', 'PIC', 'Nilai Kontrak', 'Status Termin', 'Tgl Mulai', 'Tgl Berakhir', 'Personil Ktr', 'Posisi Ktr', 'Personil Real', 'Posisi Real', 'Status Ktr', 'Status Real', 'Progress'];
      
      rows = pekerjaanData.map(item => [
        item.no,
        item.pekerjaan,
        item.owner,
        item.pic,
        this.formatCurrency(item.nilaiKontrak),
        item.statusTermin,
        this.formatDate(item.tanggalMulai),
        this.formatDate(item.tanggalBerakhir),
        item.personilKontrak,
        item.posisiKontrak,
        item.personilReal,
        item.posisiReal,
        item.statusKontrak,
        item.statusReal,
        `${item.progress}%`,
      ]);
    } else if (data.length > 0 && 'ska' in data[0]) {
      // Tenaga Ahli table
      const tenagaAhliData = data as TenagaAhli[];
      headers = ['No', 'Nama', 'Gelar 1', 'Gelar 2', 'Thn Lulus G1', 'Thn Lulus G2', 'SKA', 'Tgl Terbit', 'Tgl Berakhir', 'Terkait Pekerjaan'];
      
      rows = tenagaAhliData.map(item => [
        item.no,
        item.nama,
        item.gelar1,
        item.gelar2,
        item.tahunLulusGelar1,
        item.tahunLulusGelar2,
        item.ska,
        this.formatDate(item.tanggalTerbitSKA),
        this.formatDate(item.tanggalBerakhirSKA),
        item.terkaitPekerjaan,
      ]);
    }

    // Add table
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Halaman ${i} dari ${pageCount} - PT. Bemaco Rekaprima`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  // Export to Excel
  static exportToExcel(
    data: (Perencanaan | Pengawasan | Administrasi | TenagaAhli)[],
    title: string,
    filename: string
  ): void {
    let exportData: object[] = [];

    if (data.length > 0 && 'nilaiKontrak' in data[0]) {
      // Pekerjaan table
      exportData = (data as (Perencanaan | Pengawasan | Administrasi)[]).map(item => ({
        'No': item.no,
        'Pekerjaan': item.pekerjaan,
        'Owner/Pemberi Kerja': item.owner,
        'PIC': item.pic,
        'Nilai Kontrak': item.nilaiKontrak,
        'Status Termin': item.statusTermin,
        'Tanggal Mulai Kontrak': item.tanggalMulai,
        'Tanggal Berakhir Kontrak': item.tanggalBerakhir,
        'Personil Kontrak': item.personilKontrak,
        'Posisi Kontrak': item.posisiKontrak,
        'Personil Real': item.personilReal,
        'Posisi Real': item.posisiReal,
        'Status Kontrak': item.statusKontrak,
        'Status Real': item.statusReal,
        'Progress (%)': item.progress,
      }));
    } else if (data.length > 0 && 'ska' in data[0]) {
      // Tenaga Ahli table
      exportData = (data as TenagaAhli[]).map(item => ({
        'No': item.no,
        'Nama': item.nama,
        'Gelar 1': item.gelar1,
        'Gelar 2': item.gelar2,
        'Tahun Lulus Gelar 1': item.tahunLulusGelar1,
        'Tahun Lulus Gelar 2': item.tahunLulusGelar2,
        'SKA': item.ska,
        'Tanggal Terbit SKA': item.tanggalTerbitSKA,
        'Tanggal Berakhir SKA': item.tanggalBerakhirSKA,
        'Terkait dengan Pekerjaan': item.terkaitPekerjaan,
      }));
    }

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    
    // Set column widths
    const colWidths = Object.keys(exportData[0] || {}).map(() => ({ wch: 20 }));
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  // Print report
  static printReport(
    data: (Perencanaan | Pengawasan | Administrasi | TenagaAhli)[],
    title: string
  ): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let tableHTML = '';

    if (data.length > 0 && 'nilaiKontrak' in data[0]) {
      // Pekerjaan table
      tableHTML = `
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Pekerjaan</th>
              <th>Owner</th>
              <th>PIC</th>
              <th>Nilai Kontrak</th>
              <th>Status Termin</th>
              <th>Tgl Mulai</th>
              <th>Tgl Berakhir</th>
              <th>Personil Ktr</th>
              <th>Posisi Ktr</th>
              <th>Personil Real</th>
              <th>Posisi Real</th>
              <th>Status Ktr</th>
              <th>Status Real</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            ${(data as (Perencanaan | Pengawasan | Administrasi)[]).map(item => `
              <tr>
                <td>${item.no}</td>
                <td>${item.pekerjaan}</td>
                <td>${item.owner}</td>
                <td>${item.pic}</td>
                <td>${this.formatCurrency(item.nilaiKontrak)}</td>
                <td>${item.statusTermin}</td>
                <td>${this.formatDate(item.tanggalMulai)}</td>
                <td>${this.formatDate(item.tanggalBerakhir)}</td>
                <td>${item.personilKontrak}</td>
                <td>${item.posisiKontrak}</td>
                <td>${item.personilReal}</td>
                <td>${item.posisiReal}</td>
                <td>${item.statusKontrak}</td>
                <td>${item.statusReal}</td>
                <td>${item.progress}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else if (data.length > 0 && 'ska' in data[0]) {
      // Tenaga Ahli table
      tableHTML = `
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gelar 1</th>
              <th>Gelar 2</th>
              <th>Thn Lulus G1</th>
              <th>Thn Lulus G2</th>
              <th>SKA</th>
              <th>Tgl Terbit</th>
              <th>Tgl Berakhir</th>
              <th>Terkait Pekerjaan</th>
            </tr>
          </thead>
          <tbody>
            ${(data as TenagaAhli[]).map(item => `
              <tr>
                <td>${item.no}</td>
                <td>${item.nama}</td>
                <td>${item.gelar1}</td>
                <td>${item.gelar2}</td>
                <td>${item.tahunLulusGelar1}</td>
                <td>${item.tahunLulusGelar2}</td>
                <td>${item.ska}</td>
                <td>${this.formatDate(item.tanggalTerbitSKA)}</td>
                <td>${this.formatDate(item.tanggalBerakhirSKA)}</td>
                <td>${item.terkaitPekerjaan}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - PT. Bemaco Rekaprima</title>
          <style>
            @media print {
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 18px; }
              .header h2 { margin: 5px 0; font-size: 14px; color: #666; }
              .header p { margin: 5px 0; font-size: 12px; color: #999; }
              table { width: 100%; border-collapse: collapse; font-size: 10px; }
              th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
              th { background-color: #2980b9; color: white; font-weight: bold; }
              tr:nth-child(even) { background-color: #f5f5f5; }
              .footer { margin-top: 20px; text-align: center; font-size: 10px; color: #666; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PT. BEMACO REKAPRIMA</h1>
            <h2>${title}</h2>
            <p>Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}</p>
          </div>
          ${tableHTML}
          <div class="footer">
            <p>Dokumen ini dicetak dari Sistem Database PT. Bemaco Rekaprima</p>
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}

export default ExportService;
