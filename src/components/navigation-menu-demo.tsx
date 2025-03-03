"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Users } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Teus estudantes",
    href: "/docs/primitives/alert-dialog",
    description:
      "Vê todos os seus estudantes, em que livro estão e onde ficaram, as suas informações pessoais, necessidades e muito mais.",
  },
  {
    title: "Relatório",
    href: "/docs/primitives/hover-card",
    description:
      "Regista as tuas actividades de campo, as tuas modalidades, o tempo dispensado e muito mais.",
  },
  {
    title: "Estudo pessoal",
    href: "/docs/primitives/progress",
    description:
      "Regista, criando como lembrete, os assuntos para o seu estudo pessoal",
  },
  {
    title: "Pregação",
    href: "/docs/primitives/scroll-area",
    description: "Define o seu programa de pregação.",
  }
];

export function NavigationMenuOrganizado() {
  return (
    <div className="hidden w-full flex-col items-center justify-center gap-6 md:flex">
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Página Inicial</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Congregação</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid space-y-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <Users />
                      <div className="mt-4 mb-2 text-lg font-medium">
                        Organizado
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Gestão das actividades teocráticas da organização de
                        Jeová
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/servico" title="Privilégio de serviço">
                  Vê em que departamentos estás, quer como servo ou ajudante
                </ListItem>
                <ListItem href="/grupo" title="Grupo">
                  Vê o grupo a que pertences
                </ListItem>
                <ListItem href="/designacao" title="Designações">
                  Vê as tuas designações da semana, e os históricos das suas designações que já tiveste
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tuas Actividades</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 gap-2">
              <ul className="grid w-[400px] gap-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    className="gap-1"
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="space-y-1 hover:bg-white/10">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
