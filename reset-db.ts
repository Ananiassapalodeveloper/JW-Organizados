import { prisma } from "@/lib/prisma";

async function resetDB() {
  try {
    await prisma.membro.deleteMany({});
    await prisma.servicoMembro.deleteMany({});
    await prisma.grupo.deleteMany({});
    console.log("Banco de dados limpo com sucesso!");
  } catch (error) {
    console.error("Erro ao limpar o banco de dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDB();
