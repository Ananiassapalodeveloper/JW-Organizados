/*
  Warnings:

  - You are about to drop the `Leitor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Leitor";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sentinela" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "memberId" TEXT,
    "tema" TEXT,
    "suplenteMemberId" TEXT,
    "leitorId" TEXT,
    "leitorSuplenteId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Sentinela_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_leitorSuplenteId_fkey" FOREIGN KEY ("leitorSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sentinela" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema" FROM "Sentinela";
DROP TABLE "Sentinela";
ALTER TABLE "new_Sentinela" RENAME TO "Sentinela";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
