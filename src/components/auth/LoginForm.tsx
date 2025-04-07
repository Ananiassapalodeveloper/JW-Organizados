'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      nome: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch('/api/auth/login1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro no login');
      }

      const { user, requiresPasswordChange, token } = await response.json(); // ← Desestruture o token
    // Passe o token explicitamente:
    login(token, user, requiresPasswordChange); // ← Antes era `login(user.token, ...)`

      if (requiresPasswordChange) {
        router.push('/auth/change-password');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  );
};