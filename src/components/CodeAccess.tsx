import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Code, 
  Copy, 
  Download, 
  FileJson, 
  FileType, 
  Folder, 
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Shield,
  Terminal,
  RefreshCw
} from 'lucide-react';

// Simulated file structure
const FILE_STRUCTURE = [
  { name: 'src/', type: 'folder', children: [
    { name: 'components/', type: 'folder', children: [
      { name: 'Login.tsx', type: 'file', size: '4.2 KB' },
      { name: 'Header.tsx', type: 'file', size: '3.1 KB' },
      { name: 'Sidebar.tsx', type: 'file', size: '2.8 KB' },
      { name: 'Dashboard.tsx', type: 'file', size: '5.5 KB' },
      { name: 'DataTable.tsx', type: 'file', size: '8.2 KB' },
      { name: 'FormDialog.tsx', type: 'file', size: '6.1 KB' },
    ]},
    { name: 'hooks/', type: 'folder', children: [
      { name: 'useAuth.tsx', type: 'file', size: '2.4 KB' },
    ]},
    { name: 'services/', type: 'folder', children: [
      { name: 'dataService.ts', type: 'file', size: '5.8 KB' },
      { name: 'exportService.ts', type: 'file', size: '4.2 KB' },
    ]},
    { name: 'types/', type: 'folder', children: [
      { name: 'index.ts', type: 'file', size: '2.1 KB' },
    ]},
    { name: 'App.tsx', type: 'file', size: '3.5 KB' },
    { name: 'main.tsx', type: 'file', size: '0.8 KB' },
  ]},
  { name: 'package.json', type: 'file', size: '1.5 KB' },
  { name: 'tsconfig.json', type: 'file', size: '0.9 KB' },
  { name: 'tailwind.config.js', type: 'file', size: '1.2 KB' },
  { name: 'vite.config.ts', type: 'file', size: '0.7 KB' },
];

// Sample code snippets
const CODE_SNIPPETS = {
  auth: `// Authentication Hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (username: string, password: string) => {
    // Validate credentials
    const mockUser = MOCK_USERS[username];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      return true;
    }
    return false;
  };
  
  return { user, login, logout, hasPermission };
}`,
  data: `// Data Service
class DataService {
  static getAll<T>(division: string): T[] {
    const data = localStorage.getItem(STORAGE_KEYS[division]);
    return data ? JSON.parse(data) : [];
  }
  
  static create<T>(division: string, item: T): T {
    const data = this.getAll<T>(division);
    const newItem = { ...item, id: generateId() };
    data.push(newItem);
    localStorage.setItem(STORAGE_KEYS[division], JSON.stringify(data));
    return newItem;
  }
}`,
  types: `// User Roles
export type UserRole = 'admin_super' | 'manajemen' | 'admin' | 'member';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

// Permission mapping
export const PERMISSIONS = {
  admin_super: { canView: ['all'], canCreate: ['all'] },
  manajemen: { canView: ['all'], canCreate: ['all'] },
  admin: { canView: ['all'], canCreate: ['all'] },
  member: { canView: ['perencanaan', 'pengawasan'] },
};`,
};

export default function CodeAccess() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleUnlock = () => {
    if (password === 'super123') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Password salah!');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([CODE_SNIPPETS.auth], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-snippet.txt';
    a.click();
  };

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl">Akses Kode Aplikasi</CardTitle>
            <CardDescription>
              Masukkan password untuk mengakses kode sumber aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="code-password">Password</Label>
              <div className="relative">
                <Input
                  id="code-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button 
              onClick={handleUnlock} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Buka Akses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-800">Akses Kode</h2>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              <Shield className="w-3 h-3 mr-1" />
              Admin Super Only
            </Badge>
          </div>
          <p className="text-slate-500">Akses dan kelola kode sumber aplikasi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsUnlocked(false)}>
            <Lock className="w-4 h-4 mr-2" />
            Kunci
          </Button>
          <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Structure */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Folder className="w-5 h-5 text-blue-600" />
              Struktur File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              {FILE_STRUCTURE.map((item, index) => (
                <FileTreeItem 
                  key={index} 
                  item={item} 
                  level={0}
                  onSelect={setSelectedFile}
                  selectedFile={selectedFile}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Viewer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-600" />
              Code Viewer
            </CardTitle>
            <CardDescription>
              Lihat dan salin kode sumber aplikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="auth" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="auth">Auth Hook</TabsTrigger>
                <TabsTrigger value="data">Data Service</TabsTrigger>
                <TabsTrigger value="types">Types</TabsTrigger>
              </TabsList>
              
              {Object.entries(CODE_SNIPPETS).map(([key, code]) => (
                <TabsContent key={key} value={key}>
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopyCode(code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-[400px]">
                      <code>{code}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileJson className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Tech Stack</p>
              <p className="text-sm text-slate-500">React + TypeScript + Tailwind</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Build Tool</p>
              <p className="text-sm text-slate-500">Vite + SWC</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Version</p>
              <p className="text-sm text-slate-500">v1.0.0 (Latest)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface FileTreeItemProps {
  item: any;
  level: number;
  onSelect: (file: string) => void;
  selectedFile: string | null;
}

function FileTreeItem({ item, level, onSelect, selectedFile }: FileTreeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const paddingLeft = level * 16;

  if (item.type === 'folder') {
    return (
      <div>
        <button
          className="flex items-center gap-2 w-full py-1 px-2 rounded hover:bg-slate-100 text-left"
          style={{ paddingLeft: `${paddingLeft + 8}px` }}
          onClick={() => setExpanded(!expanded)}
        >
          <Folder className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-slate-700">{item.name}</span>
        </button>
        {expanded && item.children && (
          <div>
            {item.children.map((child: any, idx: number) => (
              <FileTreeItem
                key={idx}
                item={child}
                level={level + 1}
                onSelect={onSelect}
                selectedFile={selectedFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className={`flex items-center gap-2 w-full py-1 px-2 rounded text-left ${
        selectedFile === item.name ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-100'
      }`}
      style={{ paddingLeft: `${paddingLeft + 8}px` }}
      onClick={() => onSelect(item.name)}
    >
      <FileType className="w-4 h-4 text-slate-400" />
      <span className="text-slate-600">{item.name}</span>
      <span className="text-xs text-slate-400 ml-auto">{item.size}</span>
    </button>
  );
}
