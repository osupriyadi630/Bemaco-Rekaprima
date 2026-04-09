import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  Users, 
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  Eye,
  FileText
} from 'lucide-react';
import DataService from '@/services/dataService';
import type { DashboardSummary, BasePekerjaan } from '@/types';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: string;
<<<<<<< HEAD
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
            {trend && trendValue && (
              <div className={`flex items-center gap-1 mt-2 text-xs ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'
              }`}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : 
                 trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
=======
  centerContent?: boolean;
  onClick?: () => void;
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color, centerContent = false, onClick }: StatCardProps) {
  const valueStr = String(value);
  const isLongValue = valueStr.length > 15;
  const isVeryLongValue = valueStr.length > 25;
  const isCurrency = title === 'Nilai Kontrak';
  const textSizeClass = isCurrency
    ? 'text-sm sm:text-base'
    : isVeryLongValue
      ? 'text-sm sm:text-base'
      : isLongValue
        ? 'text-base sm:text-lg'
        : 'text-2xl sm:text-3xl';
  const valueBreakClass = 'break-words whitespace-normal';
  
  return (
    <Card onClick={onClick} className={`shadow-sm shadow-sky-200/40 hover:shadow-lg hover:shadow-sky-300/50 transition-shadow duration-300 h-full ${onClick ? 'cursor-pointer' : ''}`}>
      <CardContent className={`p-4 sm:p-6 flex flex-col ${centerContent ? 'items-center text-center' : 'items-start text-left'} justify-between`}>
        <div className="flex flex-col items-center gap-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 ${color} rounded-2xl flex items-center justify-center`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          <div className="space-y-2 max-w-full">
            <p className="text-xs sm:text-sm font-medium text-slate-500">{title}</p>
            <h3 className={`font-bold text-slate-800 ${textSizeClass} ${valueBreakClass} max-w-full`}>{value}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-slate-400 leading-snug max-w-full">{subtitle}</p>}
          </div>
        </div>

        {trend && trendValue && (
          <div className="mt-4 flex flex-col items-center gap-1 text-xs text-green-600 max-w-full">
            <div className="flex items-center gap-1 justify-center">
              {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
              <span className="font-medium break-words max-w-full">{trendValue}</span>
            </div>
          </div>
        )}
>>>>>>> e4904b7e (Update data aplikasi)
      </CardContent>
    </Card>
  );
}

interface FeedCardProps {
  title: string;
  items: BasePekerjaan[];
  type: 'latest' | 'ending';
}

function FeedCard({ title, items, type }: FeedCardProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Aktif': 'bg-green-100 text-green-700 border-green-200',
      'Selesai': 'bg-blue-100 text-blue-700 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Batal': 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {type === 'latest' ? <Clock className="w-5 h-5 text-blue-600" /> : <AlertCircle className="w-5 h-5 text-orange-500" />}
            {title}
          </CardTitle>
          <Badge variant="secondary">{items.length} Pekerjaan</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px]">
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-400">#{item.no}</span>
                      <h4 className="font-semibold text-slate-800 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.pekerjaan}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.owner}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className={`text-xs ${getStatusColor(item.statusKontrak)}`}>
                        {item.statusKontrak}
                      </Badge>
                      <span className="text-xs text-slate-400">{item.pic}</span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-medium text-slate-700">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-1.5" />
                    </div>

                    {type === 'ending' && (
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <Calendar className="w-3 h-3 text-orange-500" />
                        <span className="text-orange-600 font-medium">
                          {getDaysRemaining(item.tanggalBerakhir)} hari lagi
                        </span>
                        <span className="text-slate-400">- Berakhir {new Date(item.tanggalBerakhir).toLocaleDateString('id-ID')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
=======
  const [previewType, setPreviewType] = useState<'total' | 'aktif' | 'kontrak' | 'selesai' | 'division' | null>(null);
  const [previewTarget, setPreviewTarget] = useState<string | null>(null);
>>>>>>> e4904b7e (Update data aplikasi)

  useEffect(() => {
    const loadData = () => {
      const data = DataService.getDashboardSummary();
      setSummary(data);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading || !summary) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-32 animate-pulse bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
<<<<<<< HEAD
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
=======
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest">DASHBOARD</h2>
>>>>>>> e4904b7e (Update data aplikasi)
          <p className="text-slate-500">Ringkasan data proyek PT. Bemaco Rekaprima</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pekerjaan"
          value={summary.totalPekerjaan}
          subtitle="Seluruh divisi"
          icon={Briefcase}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="+12% dari bulan lalu"
<<<<<<< HEAD
=======
          centerContent
          onClick={() => setPreviewType('total')}
>>>>>>> e4904b7e (Update data aplikasi)
        />
        <StatCard
          title="Pekerjaan Aktif"
          value={summary.pekerjaanAktif}
          subtitle={`${Math.round((summary.pekerjaanAktif / summary.totalPekerjaan) * 100)}% dari total`}
          icon={TrendingUp}
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="up"
          trendValue="+5 pekerjaan baru"
<<<<<<< HEAD
=======
          onClick={() => setPreviewType('aktif')}
>>>>>>> e4904b7e (Update data aplikasi)
        />
        <StatCard
          title="Nilai Kontrak"
          value={formatCurrency(summary.totalNilaiKontrak)}
          subtitle="Total keseluruhan"
          icon={CheckCircle2}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
<<<<<<< HEAD
=======
          onClick={() => setPreviewType('kontrak')}
>>>>>>> e4904b7e (Update data aplikasi)
        />
        <StatCard
          title="Pekerjaan Selesai"
          value={summary.pekerjaanSelesai}
          subtitle="Tahun ini"
          icon={Calendar}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend="up"
          trendValue="+8% dari target"
<<<<<<< HEAD
        />
      </div>

=======
          onClick={() => setPreviewType('selesai')}
        />
      </div>

      {/* Preview Panel */}
      {previewType && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {previewType === 'total' && 'Preview Total Pekerjaan'}
              {previewType === 'aktif' && 'Preview Pekerjaan Aktif'}
              {previewType === 'kontrak' && 'Preview Nilai Kontrak'}
              {previewType === 'selesai' && 'Preview Pekerjaan Selesai'}
              {previewType === 'division' && previewTarget && `Preview ${previewTarget}`}
            </CardTitle>
            <button
              onClick={() => setPreviewType(null)}
              className="text-slate-500 hover:text-slate-900 text-sm"
            >
              Tutup
            </button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">
                  {previewType === 'total' && `Jumlah total pekerjaan saat ini adalah ${summary.totalPekerjaan}.`}
                  {previewType === 'aktif' && `Jumlah pekerjaan aktif yang sedang berjalan adalah ${summary.pekerjaanAktif}.`}
                  {previewType === 'kontrak' && `Total nilai kontrak saat ini mencapai ${formatCurrency(summary.totalNilaiKontrak)}.`}
                  {previewType === 'selesai' && `Jumlah pekerjaan selesai selama tahun ini adalah ${summary.pekerjaanSelesai}.`}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-800">Contoh Pekerjaan</h3>
                {summary.pekerjaanTerbaru.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-3 bg-slate-50">
                    <p className="font-semibold text-slate-800">{item.pekerjaan}</p>
                    <p className="text-xs text-slate-500">{item.owner} • {new Date(item.tanggalMulai).toLocaleDateString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

>>>>>>> e4904b7e (Update data aplikasi)
      {/* Feed Section - Instagram-like */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeedCard
          title="3 Pekerjaan Terbaru"
          items={summary.pekerjaanTerbaru}
          type="latest"
        />
        <FeedCard
          title="3 Pekerjaan Akan Berakhir"
          items={summary.pekerjaanAkanBerakhir}
          type="ending"
        />
      </div>

      {/* Division Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Ringkasan per Divisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Perencanaan', count: 3, color: 'bg-blue-500', icon: ClipboardList },
              { name: 'Pengawasan', count: 2, color: 'bg-green-500', icon: Eye },
              { name: 'Administrasi', count: 1, color: 'bg-purple-500', icon: FileText },
            ].map((div) => (
              <div 
                key={div.name} 
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
<<<<<<< HEAD
=======
                onClick={() => {
                  setPreviewType('division');
                  setPreviewTarget(div.name);
                }}
>>>>>>> e4904b7e (Update data aplikasi)
              >
                <div className={`w-12 h-12 ${div.color} rounded-xl flex items-center justify-center`}>
                  <div.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{div.name}</p>
                  <p className="text-sm text-slate-500">{div.count} Pekerjaan Aktif</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
