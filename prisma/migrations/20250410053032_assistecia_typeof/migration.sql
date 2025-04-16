-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assistencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'fimDeSemana',
    "quantidade" TEXT NOT NULL,
    "ReunioesDatesId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assistencia_ReunioesDatesId_fkey" FOREIGN KEY ("ReunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assistencia" ("ReunioesDatesId", "createdAt", "id", "name", "quantidade", "updatedAt") SELECT "ReunioesDatesId", "createdAt", "id", "name", "quantidade", "updatedAt" FROM "Assistencia";
DROP TABLE "Assistencia";
ALTER TABLE "new_Assistencia" RENAME TO "Assistencia";
CREATE UNIQUE INDEX "Assistencia_ReunioesDatesId_name_key" ON "Assistencia"("ReunioesDatesId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
