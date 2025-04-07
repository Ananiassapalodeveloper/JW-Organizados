-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tesouros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'discurso',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    CONSTRAINT "Tesouros_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tesouros" ("ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId") SELECT "ReunioesDatesId", "id", "memberId", "name", "suplenteMemberId" FROM "Tesouros";
DROP TABLE "Tesouros";
ALTER TABLE "new_Tesouros" RENAME TO "Tesouros";
CREATE UNIQUE INDEX "Tesouros_name_key" ON "Tesouros"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
