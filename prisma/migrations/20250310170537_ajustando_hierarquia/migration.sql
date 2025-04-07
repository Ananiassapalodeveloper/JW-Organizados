/*
  Warnings:

  - You are about to drop the column `carreiraId` on the `membro` table. All the data in the column will be lost.
  - You are about to drop the column `dadivaId` on the `membro` table. All the data in the column will be lost.
  - You are about to drop the column `estadoId` on the `membro` table. All the data in the column will be lost.
  - You are about to alter the column `dataAuxiliar` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataBaptismo` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataMatricula` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataNascimento` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataPublicador` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `dataRegular` on the `membro` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- CreateTable
CREATE TABLE "hierarquia_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "membroId" TEXT NOT NULL,
    "superiorId" TEXT,
    CONSTRAINT "hierarquia_membro_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hierarquia_membro_superiorId_fkey" FOREIGN KEY ("superiorId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "contacto" TEXT,
    "dataNascimento" DATETIME,
    "dataMatricula" DATETIME,
    "dataPublicador" DATETIME,
    "dataBaptismo" DATETIME,
    "dataAuxiliar" DATETIME,
    "dataRegular" DATETIME,
    "descricao" TEXT,
    "studentsId" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'BATIZADO',
    "carreira" TEXT,
    "dadiva" TEXT,
    "grupoId" TEXT,
    CONSTRAINT "membro_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_membro" ("contacto", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "grupoId", "id", "nome", "studentsId") SELECT "contacto", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "grupoId", "id", "nome", "studentsId" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_nome_key" ON "membro"("nome");
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "hierarquia_membro_membroId_key" ON "hierarquia_membro"("membroId");
