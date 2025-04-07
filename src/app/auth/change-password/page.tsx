'use client';

import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const { user, isAuthenticated, requiresPasswordChange } = useAuth(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !requiresPasswordChange) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, requiresPasswordChange, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Alterar Senha</CardTitle>
          <CardDescription className="text-center">
            {requiresPasswordChange
              ? 'Por favor, altere sua senha padrão para uma senha segura'
              : 'Altere sua senha atual'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}