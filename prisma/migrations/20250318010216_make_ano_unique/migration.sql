/*
  Warnings:

  - A unique constraint covering the columns `[ano]` on the table `Ano` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ano_ano_key" ON "Ano"("ano");
