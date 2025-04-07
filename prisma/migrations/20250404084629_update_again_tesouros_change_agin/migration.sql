-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tesouros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'discurso',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "ReunioesDatesId" TEXT NOT NULL,
    "nameLivro" TEXT,
    "lesson" TEXT,
    "Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated" DATETIME NOT NULL,
    CONSTRAINT "Tesouros_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tesouros" ("Created", "ReunioesDatesId", "Updated", "id", "lesson", "memberId", "name", "nameLivro", "suplenteMemberId") SELECT "Created", "ReunioesDatesId", "Updated", "id", "lesson", "memberId", "name", "nameLivro", "suplenteMemberId" FROM "Tesouros";
DROP TABLE "Tesouros";
ALTER TABLE "new_Tesouros" RENAME TO "Tesouros";
CREATE UNIQUE INDEX "Tesouros_name_ReunioesDatesId_key" ON "Tesouros"("name", "ReunioesDatesId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
