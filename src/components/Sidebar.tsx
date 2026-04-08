import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  ClipboardList,
  Eye,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Settings,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { Division } from '@/types';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  division?: Division | 'code_access';
  requiresPermission?: 'view' | 'create' | 'edit' | 'delete' | 'code_access';
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'perencanaan', label: 'Perencanaan', icon: ClipboardList, division: 'perencanaan', requiresPermission: 'view' },
  { id: 'pengawasan', label: 'Pengawasan', icon: Eye, division: 'pengawasan', requiresPermission: 'view' },
  { id: 'administrasi', label: 'Administrasi', icon: FileText, division: 'administrasi', requiresPermission: 'view' },
  { id: 'tenagaahli', label: 'Tenaga Ahli', icon: Users, division: 'tenagaahli', requiresPermission: 'view' },
];

const bottomNavItems: NavItem[] = [
  { id: 'laporan', label: 'Laporan', icon: BarChart3 },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
];

// Code access menu (only for admin_super)
const codeNavItem: NavItem = { 
  id: 'code_access', 
  label: 'Akses Kode', 
  icon: Code, 
  requiresPermission: 'code_access' 
};

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { hasPermission } = useAuth();

  const handleNavClick = (itemId: string) => {
    onViewChange(itemId);
  };

  const NavButton = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const isActive = activeView === item.id;
    
    // Check permission if required
    if (item.requiresPermission) {
      if (item.requiresPermission === 'code_access') {
        if (!hasPermission('code_access')) {
          return null;
        }
      } else if (item.division && !hasPermission(item.requiresPermission, item.division)) {
        return null;
      }
    }

    return (
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start gap-3 transition-all duration-200',
          isActive 
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
          collapsed && 'justify-center px-2',
          item.id === 'code_access' && 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
        )}
        onClick={() => handleNavClick(item.id)}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-white')} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </Button>
    );
  };

  return (
    <aside
      className={cn(
        'bg-white border-r border-slate-200 flex flex-col transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)]',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
          {/* Code Access Menu - Only for admin_super */}
          <NavButton item={codeNavItem} />
        </div>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
            <p className="text-xs font-medium text-blue-800">PT. Bemaco Rekaprima</p>
            <p className="text-xs text-blue-600 mt-1">v1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
}
