/*
  Warnings:

  - A unique constraint covering the columns `[name,reunioesDatesId]` on the table `Ministerio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ministerio_name_reunioesDatesId_key" ON "Ministerio"("name", "reunioesDatesId");
