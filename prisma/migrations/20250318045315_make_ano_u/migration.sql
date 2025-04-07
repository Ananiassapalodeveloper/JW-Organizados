/*
  Warnings:

  - Made the column `anoId` on table `Meses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "ReunioesDates_mesId_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes" INTEGER NOT NULL,
    "descricao" TEXT,
    "anoId" TEXT NOT NULL,
    CONSTRAINT "Meses_anoId_fkey" FOREIGN KEY ("anoId") REFERENCES "Ano" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Meses" ("anoId", "descricao", "id", "mes") SELECT "anoId", "descricao", "id", "mes" FROM "Meses";
DROP TABLE "Meses";
ALTER TABLE "new_Meses" RENAME TO "Meses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
