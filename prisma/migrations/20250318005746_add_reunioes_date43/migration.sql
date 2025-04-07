/*
  Warnings:

  - You are about to drop the `Designacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reuniao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReuniaoFimSemana` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReuniaoMeioSemana` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReuniaoMensal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `AnosId` on the `Meses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ano_ano_key";

-- DropIndex
DROP INDEX "Designacao_name_reuniaoMeioSemanaId_reuniaoFimSemanaId_idx";

-- DropIndex
DROP INDEX "Mes_nome_reuniaoId_idx";

-- DropIndex
DROP INDEX "Parte_name_designacaoId_memberId_suplenteMemberId_grupoId_idx";

-- DropIndex
DROP INDEX "Reuniao_ano_idx";

-- DropIndex
DROP INDEX "ReuniaoFimSemana_nameDate_reuniaoMensalId_idx";

-- DropIndex
DROP INDEX "ReuniaoMeioSemana_nameDate_reuniaoMensalId_idx";

-- DropIndex
DROP INDEX "ReuniaoMensal_mesId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Designacao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Parte";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reuniao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReuniaoFimSemana";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReuniaoMeioSemana";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReuniaoMensal";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes" INTEGER NOT NULL,
    "descricao" TEXT,
    "anoId" TEXT,
    CONSTRAINT "Meses_anoId_fkey" FOREIGN KEY ("anoId") REFERENCES "Ano" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Meses" ("descricao", "id", "mes") SELECT "descricao", "id", "mes" FROM "Meses";
DROP TABLE "Meses";
ALTER TABLE "new_Meses" RENAME TO "Meses";
CREATE TABLE "new_ReunioesDates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mesId" TEXT,
    CONSTRAINT "ReunioesDates_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Meses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReunioesDates" ("date", "id", "mesId") SELECT "date", "id", "mesId" FROM "ReunioesDates";
DROP TABLE "ReunioesDates";
ALTER TABLE "new_ReunioesDates" RENAME TO "ReunioesDates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
