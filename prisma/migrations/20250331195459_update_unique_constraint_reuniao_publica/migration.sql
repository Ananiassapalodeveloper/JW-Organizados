-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReuniaoPublica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'presidente',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "tema" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoPublica_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReuniaoPublica" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId", "tema" FROM "ReuniaoPublica";
DROP TABLE "ReuniaoPublica";
ALTER TABLE "new_ReuniaoPublica" RENAME TO "ReuniaoPublica";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
