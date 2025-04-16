import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Grupo = {
  nome: string;
  dirigente: string | null;
  ajudante: {
    nome: string;
  };
};

type Servico = {
  id: string;
  servico: string;
  posicao: string;
};

type User = {
  id: string;
  nome: string;
  email: string;
  contacto: string;
  dataNascimento: string;
  estado: string;
  carreira: string;
  dadiva: string;
  grupo: Grupo;
  servicos: Servico[];
  mustChangePassword: boolean;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (nome: string, password: string) => Promise<void>;
  logout: () => void;
  updatePassword: (newPassword: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      login: async (nome, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, password }),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Credenciais inválidas');
          }
          
          set({
            user: {
              ...data.user,
              mustChangePassword: data.user.password === '1234', // Verifica se é senha padrão
            },
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });
          
          // Se a senha é a padrão, redireciona para troca de senha
          if (data.user.password === '1234') {
            window.location.href = '/update-password';
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Erro no login',
            loading: false,
          });
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        // Limpar cookies se estiver usando
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },
      
      updatePassword: async (newPassword) => {
        set({ loading: true });
        try {
          const { user, token } = get();
          if (!user || !token) throw new Error('Não autenticado');
          
          const response = await fetch('/api/auth/update-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ newPassword }),
          });
          
          if (!response.ok) {
            throw new Error('Falha ao atualizar senha');
          }
          
          set({
            user: {
              ...user,
              mustChangePassword: false,
            },
            loading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Erro ao atualizar senha',
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);