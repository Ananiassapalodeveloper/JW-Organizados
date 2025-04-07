import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Membro } from '@prisma/client';

type SafeMembro = Omit<Membro, 'password'> & {
  requiresPasswordChange: boolean;
};

type AuthState = {
  token: string | null;
  user: SafeMembro | null;
  isAuthenticated: boolean;
 // ... outros tipos ...
 login: (token: string, user: SafeMembro, requiresPasswordChange: boolean) => void; // ← Token é string
  logout: () => void;
  requiresPasswordChange: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user, requiresPasswordChange) => 
        set({ 
          token, 
          user: { ...user, requiresPasswordChange }, 
          isAuthenticated: true 
        }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      requiresPasswordChange: () => get().user?.requiresPasswordChange || false,
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);