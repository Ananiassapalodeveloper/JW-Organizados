/*
  Warnings:

  - You are about to drop the `BookDeOratoriaDeconselho` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Tesouros" ADD COLUMN "LivroDeConselhoId" TEXT;
ALTER TABLE "Tesouros" ADD COLUMN "lesson" INTEGER;
ALTER TABLE "Tesouros" ADD COLUMN "nameLivro" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BookDeOratoriaDeconselho";
PRAGMA foreign_keys=on;
