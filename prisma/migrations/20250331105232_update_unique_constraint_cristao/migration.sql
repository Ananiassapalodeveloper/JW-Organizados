/*
  Warnings:

  - A unique constraint covering the columns `[name,ReunioesDatesId]` on the table `PartesInicias` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cristao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'parte1',
    "ReunioesDatesId" TEXT NOT NULL,
    "tema" TEXT,
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "leitorId" TEXT,
    "leitorSuplenteId" TEXT,
    CONSTRAINT "Cristao_leitorId_fkey" FOREIGN KEY ("leitorId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_leitorSuplenteId_fkey" FOREIGN KEY ("leitorSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cristao" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema" FROM "Cristao";
DROP TABLE "Cristao";
ALTER TABLE "new_Cristao" RENAME TO "Cristao";
CREATE UNIQUE INDEX "Cristao_name_ReunioesDatesId_key" ON "Cristao"("name", "ReunioesDatesId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PartesInicias_name_ReunioesDatesId_key" ON "PartesInicias"("name", "ReunioesDatesId");
