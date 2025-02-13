// store/authStore.ts
import { create } from "zustand"; // Se ocorrer erro, verifique o "esModuleInterop" no tsconfig.json
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer"; // Importa o middleware Immer

export interface User {
  id: string;
  email: string;
  // Outros campos que você precise
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set) => ({
      user: null,
      token: null,
      login: (user, token) =>
        set((state) => {
          state.user = user;
          state.token = token;
        }),
      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
        }),
    })),
    {
      name: "auth-store", // Nome do item no localStorage
      // Você pode adicionar outras configurações de persistência se necessário
    }
  )
);
