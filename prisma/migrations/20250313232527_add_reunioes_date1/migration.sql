/*
  Warnings:

  - The primary key for the `Ministerio` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ministerio" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Ministerio" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId" FROM "Ministerio";
DROP TABLE "Ministerio";
ALTER TABLE "new_Ministerio" RENAME TO "Ministerio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
