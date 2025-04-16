/*
  Warnings:

  - Added the required column `updatedAt` to the `Assistencia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assistencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'fimDeSemana',
    "quantidade" INTEGER NOT NULL,
    "ReunioesDatesId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assistencia_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assistencia" ("ReunioesDatesId", "id", "name", "quantidade") SELECT "ReunioesDatesId", "id", "name", "quantidade" FROM "Assistencia";
DROP TABLE "Assistencia";
ALTER TABLE "new_Assistencia" RENAME TO "Assistencia";
CREATE UNIQUE INDEX "Assistencia_ReunioesDatesId_name_key" ON "Assistencia"("ReunioesDatesId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
