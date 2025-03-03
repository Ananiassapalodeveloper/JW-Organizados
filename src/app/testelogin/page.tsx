// app/login/page.tsx
"use client";

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios'; // seu axios configurado

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Supondo que a resposta contenha "user" e "token":
      login(data.user, data.token);
      
      // Redirecionar ou exibir mensagem de sucesso...
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Sua senha"
      />
      <button type="submit">Login</button>
    </form>
  );
}
