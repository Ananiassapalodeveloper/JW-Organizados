'use client';

import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Alterar Senha</CardTitle>
          <CardDescription>
            Por favor, altere sua senha padrão para uma senha segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}