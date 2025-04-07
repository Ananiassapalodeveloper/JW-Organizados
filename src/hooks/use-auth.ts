'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export const useAuth = (redirectIfUnauthenticated = false) => {
  const { user, token, isAuthenticated, logout, requiresPasswordChange } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (redirectIfUnauthenticated && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, redirectIfUnauthenticated, router]);

  return {
    user,
    token,
    isAuthenticated,
    logout,
    requiresPasswordChange: requiresPasswordChange(),
  };
};