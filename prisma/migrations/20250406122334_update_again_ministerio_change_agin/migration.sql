/*
  Warnings:

  - Added the required column `Updated` to the `Ministerio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ministerio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'iniciarConversa1',
    "memberDirigenteId" TEXT NOT NULL,
    "memberMoradorId" TEXT,
    "memberDirigenteSuplenteId" TEXT,
    "memberMoradorSuplenteId" TEXT,
    "reunioesDatesId" TEXT NOT NULL,
    "tema" TEXT,
    "nameLivro" TEXT,
    "lessonPoint" TEXT,
    "Created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated" DATETIME NOT NULL,
    CONSTRAINT "Ministerio_memberDirigenteId_fkey" FOREIGN KEY ("memberDirigenteId") REFERENCES "membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberMoradorId_fkey" FOREIGN KEY ("memberMoradorId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberDirigenteSuplenteId_fkey" FOREIGN KEY ("memberDirigenteSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberMoradorSuplenteId_fkey" FOREIGN KEY ("memberMoradorSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_reunioesDatesId_fkey" FOREIGN KEY ("reunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ministerio" ("id", "memberDirigenteId", "memberDirigenteSuplenteId", "memberMoradorId", "memberMoradorSuplenteId", "name", "reunioesDatesId", "tema") SELECT "id", "memberDirigenteId", "memberDirigenteSuplenteId", "memberMoradorId", "memberMoradorSuplenteId", "name", "reunioesDatesId", "tema" FROM "Ministerio";
DROP TABLE "Ministerio";
ALTER TABLE "new_Ministerio" RENAME TO "Ministerio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
