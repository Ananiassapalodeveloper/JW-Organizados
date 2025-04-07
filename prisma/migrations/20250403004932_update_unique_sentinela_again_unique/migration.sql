/*
  Warnings:

  - A unique constraint covering the columns `[ReunioesDatesId,name]` on the table `Sentinela` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sentinela_ReunioesDatesId_name_key" ON "Sentinela"("ReunioesDatesId", "name");
