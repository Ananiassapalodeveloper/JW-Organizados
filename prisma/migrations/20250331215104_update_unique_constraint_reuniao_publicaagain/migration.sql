/*
  Warnings:

  - A unique constraint covering the columns `[ReunioesDatesId,name]` on the table `ReuniaoPublica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReuniaoPublica_ReunioesDatesId_name_key" ON "ReuniaoPublica"("ReunioesDatesId", "name");
