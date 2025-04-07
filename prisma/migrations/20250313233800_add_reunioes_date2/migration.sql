/*
  Warnings:

  - You are about to drop the column `ReunioesDatesId` on the `Ministerio` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Ministerio` table. All the data in the column will be lost.
  - You are about to drop the column `suplenteMemberId` on the `Ministerio` table. All the data in the column will be lost.
  - Added the required column `reunioesDatesId` to the `Ministerio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cristao" ADD COLUMN "tema" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ministerio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'IniciarConversa1',
    "memberDirigenteId" TEXT,
    "memberMoradorId" TEXT,
    "memberDirigenteSuplenteId" TEXT,
    "memberMoradorSuplenteId" TEXT,
    "reunioesDatesId" TEXT NOT NULL,
    "tema" TEXT,
    CONSTRAINT "Ministerio_memberDirigenteId_fkey" FOREIGN KEY ("memberDirigenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberMoradorId_fkey" FOREIGN KEY ("memberMoradorId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberDirigenteSuplenteId_fkey" FOREIGN KEY ("memberDirigenteSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberMoradorSuplenteId_fkey" FOREIGN KEY ("memberMoradorSuplenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_reunioesDatesId_fkey" FOREIGN KEY ("reunioesDatesId") REFERENCES "ReunioesDates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ministerio" ("id", "name") SELECT "id", "name" FROM "Ministerio";
DROP TABLE "Ministerio";
ALTER TABLE "new_Ministerio" RENAME TO "Ministerio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
