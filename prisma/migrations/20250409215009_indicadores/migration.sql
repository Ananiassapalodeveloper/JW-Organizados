-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Indicadores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'sectorA',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Indicadores_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Indicadores" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId" FROM "Indicadores";
DROP TABLE "Indicadores";
ALTER TABLE "new_Indicadores" RENAME TO "Indicadores";
CREATE UNIQUE INDEX "Indicadores_ReunioesDatesId_name_key" ON "Indicadores"("ReunioesDatesId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
