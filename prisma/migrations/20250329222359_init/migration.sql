/*
  Warnings:

  - A unique constraint covering the columns `[name,ReunioesDatesId]` on the table `Tesouros` will be added. If there are existing duplicate values, this will fail.
  - Made the column `memberDirigenteId` on table `Ministerio` required. This step will fail if there are existing NULL values in that column.

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

-- CreateIndex
CREATE UNIQUE INDEX "Tesouros_name_ReunioesDatesId_key" ON "Tesouros"("name", "ReunioesDatesId");
