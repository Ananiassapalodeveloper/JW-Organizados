/*
  Warnings:

  - You are about to drop the `carreira` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dadiva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posicao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico_membro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "carreira";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "dadiva";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "estado";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "posicao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "servico";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "servico_membro";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ServicoMembro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "membroId" TEXT NOT NULL,
    "servico" TEXT NOT NULL,
    "posicao" TEXT NOT NULL,
    CONSTRAINT "ServicoMembro_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicoMembro_membroId_servico_key" ON "ServicoMembro"("membroId", "servico");
