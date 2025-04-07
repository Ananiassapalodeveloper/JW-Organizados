-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sentinela" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'dirigente',
    "memberId" TEXT,
    "tema" TEXT,
    "suplenteMemberId" TEXT,
    "leitorId" TEXT,
    "leitorSuplenteId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Sentinela_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sentinela" ("ReunioesDatesId", "id", "leitorId", "leitorSuplenteId", "memberId", "name", "suplenteMemberId", "tema") SELECT "ReunioesDatesId", "id", "leitorId", "leitorSuplenteId", "memberId", "name", "suplenteMemberId", "tema" FROM "Sentinela";
DROP TABLE "Sentinela";
ALTER TABLE "new_Sentinela" RENAME TO "Sentinela";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
