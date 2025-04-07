/*
  Warnings:

  - Made the column `mesId` on table `ReunioesDates` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReunioesDates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mesId" TEXT NOT NULL,
    CONSTRAINT "ReunioesDates_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Meses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReunioesDates" ("date", "id", "mesId") SELECT "date", "id", "mesId" FROM "ReunioesDates";
DROP TABLE "ReunioesDates";
ALTER TABLE "new_ReunioesDates" RENAME TO "ReunioesDates";
CREATE UNIQUE INDEX "ReunioesDates_mesId_key" ON "ReunioesDates"("mesId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
