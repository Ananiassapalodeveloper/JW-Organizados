import Header from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Visão geral da congregação praça Nova 3",
};

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function MainPageLayout({ children }: UsersLayoutProps) {
  return <main>
    <Header/>
    {children}
    </main>;
}
