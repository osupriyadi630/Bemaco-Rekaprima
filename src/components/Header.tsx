import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building2, LogOut, User, Bell, Settings, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const { user } = useAuth();

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin_super: 'Admin Super',
      manajemen: 'Manajemen',
      admin: 'Administrator',
      member: 'Member',
    };
    return labels[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin_super: 'bg-purple-100 text-purple-700 border-purple-300',
      manajemen: 'bg-blue-100 text-blue-700 border-blue-300',
      admin: 'bg-red-100 text-red-700 border-red-300',
      member: 'bg-green-100 text-green-700 border-green-300',
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const getAvatarColor = (role: string) => {
    const colors: Record<string, string> = {
      admin_super: 'bg-gradient-to-br from-purple-500 to-purple-700',
      manajemen: 'bg-gradient-to-br from-blue-500 to-blue-700',
      admin: 'bg-gradient-to-br from-red-500 to-red-700',
      member: 'bg-gradient-to-br from-green-500 to-green-700',
    };
    return colors[role] || 'bg-gradient-to-br from-gray-500 to-gray-700';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-slate-800 leading-tight">
              PT. BEMACO REKAPRIMA
            </h1>
            <p className="text-xs text-slate-500">Sistem Database Manajemen Proyek</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Role Badge */}
          <div className={`hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user?.role || '')}`}>
            {user?.role === 'admin_super' && <Shield className="w-3 h-3" />}
            {getRoleLabel(user?.role || '')}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-slate-600" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={`text-xs font-semibold text-white ${getAvatarColor(user?.role || '')}`}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-700">{user?.name}</p>
                  <p className="text-xs text-slate-500">{getRoleLabel(user?.role || '')}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
