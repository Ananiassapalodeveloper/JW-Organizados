'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isAuthenticated, requiresPasswordChange, logout } = useAuth(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && requiresPasswordChange) {
      router.push('/auth/change-password');
    }
  }, [isAuthenticated, requiresPasswordChange, router]);

  if (!user) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bem-vindo, {user.nome}</h1>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Adicione os componentes do dashboard aqui */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium">Informações</h3>
            <p className="mt-2 text-gray-600">Email: {user.email || 'Não informado'}</p>
            <p className="mt-1 text-gray-600">Contato: {user.contacto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}