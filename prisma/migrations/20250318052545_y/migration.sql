/*
  Warnings:

  - You are about to drop the column `date` on the `ReunioesDates` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReunioesDates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mesId" TEXT NOT NULL,
    CONSTRAINT "ReunioesDates_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Meses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReunioesDates" ("id", "mesId") SELECT "id", "mesId" FROM "ReunioesDates";
DROP TABLE "ReunioesDates";
ALTER TABLE "new_ReunioesDates" RENAME TO "ReunioesDates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
