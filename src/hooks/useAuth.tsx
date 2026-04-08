import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print' | 'code_access', division?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin_super': {
    password: 'super123',
    user: {
      id: '1',
      username: 'admin_super',
      name: 'Admin Super',
      role: 'admin_super',
      email: 'super@bemaco.co.id',
    },
  },
  'manajemen': {
    password: 'manajemen123',
    user: {
      id: '2',
      username: 'manajemen',
      name: 'Manajemen',
      role: 'manajemen',
      email: 'manajemen@bemaco.co.id',
    },
  },
  'admin': {
    password: 'admin123',
    user: {
      id: '3',
      username: 'admin',
      name: 'Administrator',
      role: 'admin',
      email: 'admin@bemaco.co.id',
    },
  },
  'member': {
    password: 'member123',
    user: {
      id: '4',
      username: 'member',
      name: 'Member',
      role: 'member',
      email: 'member@bemaco.co.id',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bemaco_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const mockUser = MOCK_USERS[username.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('bemaco_user', JSON.stringify(mockUser.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('bemaco_user');
  }, []);

  const hasPermission = useCallback((action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'print' | 'code_access', division?: string): boolean => {
    if (!user) return false;
    
    const role = user.role;
    
    // Admin Super - Full Access including code
    if (role === 'admin_super') {
      if (action === 'code_access') return true;
      return true;
    }
    
    // Manajemen - Full Access
    if (role === 'manajemen') {
      if (action === 'code_access') return false;
      return true;
    }
    
    // Admin - Full Access except code
    if (role === 'admin') {
      if (action === 'code_access') return false;
      return true;
    }
    
    // Member - Hanya bisa lihat Perencanaan dan Pengawasan
    if (role === 'member') {
      if (action === 'view' && division) {
        return ['perencanaan', 'pengawasan'].includes(division);
      }
      return false;
    }
    
    return false;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
