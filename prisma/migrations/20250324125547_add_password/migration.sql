/*
  Warnings:

  - Made the column `contacto` on table `membro` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PartesInicias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'presidente',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "PartesInicias_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PartesInicias" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId" FROM "PartesInicias";
DROP TABLE "PartesInicias";
ALTER TABLE "new_PartesInicias" RENAME TO "PartesInicias";
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL DEFAULT '1234',
    "contacto" TEXT NOT NULL,
    "dataNascimento" DATETIME,
    "dataMatricula" DATETIME,
    "dataPublicador" DATETIME,
    "dataBaptismo" DATETIME,
    "dataAuxiliar" DATETIME,
    "dataRegular" DATETIME,
    "descricao" TEXT,
    "studentsId" TEXT,
    "sexo" TEXT NOT NULL DEFAULT 'M',
    "estado" TEXT NOT NULL DEFAULT 'BATIZADO',
    "carreira" TEXT,
    "dadiva" TEXT,
    "grupoId" TEXT,
    CONSTRAINT "membro_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_membro" ("carreira", "contacto", "dadiva", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estado", "grupoId", "id", "nome", "sexo", "studentsId") SELECT "carreira", "contacto", "dadiva", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estado", "grupoId", "id", "nome", "sexo", "studentsId" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_nome_key" ON "membro"("nome");
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
CREATE INDEX "membro_nome_idx" ON "membro"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
