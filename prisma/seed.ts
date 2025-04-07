import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Roda o seed
// npx prisma db seed
// Isso vai inserir grupo1, grupo2, grupo3 se ainda não existirem.

async function main() {
  const gruposDefault = ['grupo1', 'grupo2', 'grupo3']

  for (const nome of gruposDefault) {
    await prisma.grupo.upsert({
      where: { nome },
      update: {},
      create: { nome,descricao:`Este é o grupo número ${nome}` }
    })
  }

  console.log('Grupos padrão inseridos!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
