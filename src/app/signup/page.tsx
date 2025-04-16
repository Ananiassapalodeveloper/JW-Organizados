/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import { User, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/hooks/use-membro-form-data";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";


const SignUpSchema = z
  .object({
    password: z
      .string({ required_error: "Por favor insira a sua senha" })
      .min(1, { message: "Por favor insira a sua senha" }),
    name: z
      .string({ required_error: "O teu nome é obrigatório" })
      .min(1, { message: "O teu nome é obrigatório" }),
    newPassWord: z
      .string({ required_error: "A tua nova senha é obrigatório" })
      .min(1, { message: "A tua nova senha é obrigatório" }),
  })
  .refine(
    (data) => {
      if (data.password === data.newPassWord) {
        return !!(data.password === data.newPassWord);
      }
      return true;
    },
    {
      message: "Por uma questão de segurança melhor pôr um nova senha",
      path: ["newPassWord"],
    }
  );

type SignUpType = z.infer<typeof SignUpSchema>;

// Valores padrão para o formulário
const defaultValues: Partial<SignUpType> = {
  password: "1234",
  name: "",
  newPassWord: "",
};

export default function SignInPage() {
  const [submitError, setSubmitError] = useState<any | null>(null);
  const router = useRouter();

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: SignUpType) {
    try {
      setSubmitError(null);

      const formData = {
        nome: values.name,
        password: values.password,
        newPassWord: values.newPassWord,
      };

      await api.put("auth/registar", formData);

      // Supondo que a resposta contenha "user" e "token":
      // login(data.data, data?.token);
      toast({
        title: "Sessão feito com êxito!",
        description: "Bom tê-lo connosco, tenha um bom tabalho",
        variant: "default",
      });

      router.refresh();
      router.push("/auth/login");

      reset(defaultValues);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "";
        setSubmitError(errorMessage);

        toast({
          title: "Erro ao iniciar sessão",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro inesperado",
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Cadastre-se para acessar o sistema. Redefina a sua senha dada pelo
              o administrador
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Feliz em vê-lo(a)
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    {submitError}
                  </div>
                )}
                <div className="grid gap-2 ">
                  <motion.div
                    className="grid gap-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Seu nome completo"
                                type="text"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid gap-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <FormField
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha recebida</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Adicione a senha"
                                type="password"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    className="grid gap-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <motion.div
                      className="grid gap-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <FormField
                        control={control}
                        name="newPassWord"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nova senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Crie uma senha segura"
                                  type="password"
                                  className="pl-8"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSubmitting ? "Criando conta..." : "Criar conta"}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <motion.div
              className="text-sm text-muted-foreground text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Entrar
              </a>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
