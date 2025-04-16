// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/hooks/use-auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// const passwordSchema = z.object({
//   oldPassword: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres').optional(),
//   newPassword: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
//   confirmPassword: z.string(),
// }).refine(data => data.newPassword === data.confirmPassword, {
//   message: 'As senhas não coincidem',
//   path: ['confirmPassword'],
// });

// type PasswordFormValues = z.infer<typeof passwordSchema>;

// export const ChangePasswordForm = ({ userId }: { userId: string }) => {
//   const router = useRouter();
//   // const { requiresPasswordChange } = useAuth();
//   const form = useForm<PasswordFormValues>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//   });

//   const onSubmit = async (data: PasswordFormValues) => {
//     try {
//       const payload = {
//         oldPassword: requiresPasswordChange ? '1234' : data.oldPassword,
//         newPassword: data.newPassword
//       };

//       const response = await fetch(`/api/membros/${userId}/password`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Erro ao alterar senha');
//       }

//       router.push('/dashboard');
//     } catch (error) {
//       form.setError('root', {
//         type: 'manual',
//         message: error instanceof Error ? error.message : 'Erro desconhecido',
//       });
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         {form.formState.errors.root && (
//           <div className="text-red-500 text-sm">
//             {form.formState.errors.root.message}
//           </div>
//         )}

//         {requiresPasswordChange && (
//           <FormField
//             control={form.control}
//             name="oldPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Senha Atual</FormLabel>
//                 <FormControl>
//                   <Input type="password" required {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         )}

//         {requiresPasswordChange && (
//           <div className="text-yellow-600 text-sm mb-4">
//             Você está usando a senha padrão. Por favor, defina uma nova senha segura.{String(requiresPasswordChange)}
//           </div>
//         )}

//         <FormField
//           control={form.control}
//           name="newPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nova Senha</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirmar Nova Senha</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
//           {form.formState.isSubmitting ? 'Alterando...' : 'Alterar Senha'}
//         </Button>
//       </form>
//     </Form>
//   );
// };