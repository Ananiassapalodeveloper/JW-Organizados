/*
  Warnings:

  - You are about to drop the `FourRenionDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Arrumacao` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Assistencia` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Cristao` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Indicadores` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Ministerio` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `PartesFinais` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `PartesInicias` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `ReuniaoPublica` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Sentinela` table. All the data in the column will be lost.
  - You are about to drop the column `fourRenionDateId` on the `Tesouros` table. All the data in the column will be lost.
  - Added the required column `ReunioesDatesId` to the `Arrumacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Assistencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Cristao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Indicadores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Ministerio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `PartesFinais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `PartesInicias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `ReuniaoPublica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Sentinela` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReunioesDatesId` to the `Tesouros` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FourRenionDate";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ReunioesDates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "mesId" TEXT,
    CONSTRAINT "ReunioesDates_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Meses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Arrumacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "grupoId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Arrumacao_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Arrumacao_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Arrumacao" ("grupoId", "id", "name") SELECT "grupoId", "id", "name" FROM "Arrumacao";
DROP TABLE "Arrumacao";
ALTER TABLE "new_Arrumacao" RENAME TO "Arrumacao";
CREATE TABLE "new_Assistencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Assistencia_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assistencia" ("id", "name", "quantidade") SELECT "id", "name", "quantidade" FROM "Assistencia";
DROP TABLE "Assistencia";
ALTER TABLE "new_Assistencia" RENAME TO "Assistencia";
CREATE TABLE "new_Cristao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Dicursos',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Cristao_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cristao" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "Cristao";
DROP TABLE "Cristao";
ALTER TABLE "new_Cristao" RENAME TO "Cristao";
CREATE TABLE "new_Indicadores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Indicadores_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Indicadores" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "Indicadores";
DROP TABLE "Indicadores";
ALTER TABLE "new_Indicadores" RENAME TO "Indicadores";
CREATE TABLE "new_Ministerio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'IniciarConversa1',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Ministerio_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ministerio" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "Ministerio";
DROP TABLE "Ministerio";
ALTER TABLE "new_Ministerio" RENAME TO "Ministerio";
CREATE TABLE "new_PartesFinais" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "PartesFinais_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesFinais_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesFinais_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PartesFinais" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "PartesFinais";
DROP TABLE "PartesFinais";
ALTER TABLE "new_PartesFinais" RENAME TO "PartesFinais";
CREATE TABLE "new_PartesInicias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "PartesInicias_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PartesInicias" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "PartesInicias";
DROP TABLE "PartesInicias";
ALTER TABLE "new_PartesInicias" RENAME TO "PartesInicias";
CREATE TABLE "new_ReuniaoPublica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoPublica_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReuniaoPublica" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "ReuniaoPublica";
DROP TABLE "ReuniaoPublica";
ALTER TABLE "new_ReuniaoPublica" RENAME TO "ReuniaoPublica";
CREATE TABLE "new_Sentinela" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "tema" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Sentinela_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sentinela" ("id", "memberId", "name", "suplenteMemberId", "tema") SELECT "id", "memberId", "name", "suplenteMemberId", "tema" FROM "Sentinela";
DROP TABLE "Sentinela";
ALTER TABLE "new_Sentinela" RENAME TO "Sentinela";
CREATE TABLE "new_Tesouros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Dicursos',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Tesouros_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tesouros" ("id", "memberId", "name", "suplenteMemberId") SELECT "id", "memberId", "name", "suplenteMemberId" FROM "Tesouros";
DROP TABLE "Tesouros";
ALTER TABLE "new_Tesouros" RENAME TO "Tesouros";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
