/*
  Warnings:

  - You are about to drop the column `isBaptizado` on the `membro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `carreira` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `dadiva` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `estado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `posicao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome]` on the table `servico` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "contacto" TEXT,
    "dataNascimento" TEXT,
    "dataMatricula" TEXT,
    "dataPublicador" TEXT,
    "dataBaptismo" TEXT,
    "dataAuxiliar" TEXT,
    "dataRegular" TEXT,
    "descricao" TEXT,
    "estadoId" TEXT,
    "carreiraId" TEXT,
    "dadivaId" TEXT,
    CONSTRAINT "membro_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_dadivaId_fkey" FOREIGN KEY ("dadivaId") REFERENCES "dadiva" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_membro" ("carreiraId", "contacto", "dadivaId", "dataBaptismo", "dataNascimento", "email", "estadoId", "id", "nome") SELECT "carreiraId", "contacto", "dadivaId", "dataBaptismo", "dataNascimento", "email", "estadoId", "id", "nome" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_nome_key" ON "membro"("nome");
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "carreira_nome_key" ON "carreira"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "dadiva_nome_key" ON "dadiva"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "estado_nome_key" ON "estado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "posicao_nome_key" ON "posicao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "servico_nome_key" ON "servico"("nome");
