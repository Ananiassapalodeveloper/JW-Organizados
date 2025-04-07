-- CreateTable
CREATE TABLE "Reuniao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ano" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Mes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "reuniaoId" TEXT NOT NULL,
    CONSTRAINT "Mes_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReuniaoMensal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mesId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoMensal_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Mes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReuniaoMeioSemana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameDate" TEXT NOT NULL,
    "reuniaoMensalId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoMeioSemana_reuniaoMensalId_fkey" FOREIGN KEY ("reuniaoMensalId") REFERENCES "ReuniaoMensal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReuniaoFimSemana" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameDate" TEXT NOT NULL,
    "reuniaoMensalId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoFimSemana_reuniaoMensalId_fkey" FOREIGN KEY ("reuniaoMensalId") REFERENCES "ReuniaoMensal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Designacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "reuniaoMeioSemanaId" TEXT,
    "reuniaoFimSemanaId" TEXT,
    CONSTRAINT "Designacao_reuniaoMeioSemanaId_fkey" FOREIGN KEY ("reuniaoMeioSemanaId") REFERENCES "ReuniaoMeioSemana" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Designacao_reuniaoFimSemanaId_fkey" FOREIGN KEY ("reuniaoFimSemanaId") REFERENCES "ReuniaoFimSemana" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "designacaoId" TEXT NOT NULL,
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "grupoId" TEXT,
    "bookDeOratoriaDeconselhoId" TEXT,
    CONSTRAINT "Parte_designacaoId_fkey" FOREIGN KEY ("designacaoId") REFERENCES "Designacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Parte_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Parte_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Parte_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Parte_bookDeOratoriaDeconselhoId_fkey" FOREIGN KEY ("bookDeOratoriaDeconselhoId") REFERENCES "BookDeOratoriaDeconselho" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookDeOratoriaDeconselho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lesson" INTEGER NOT NULL,
    "ponto" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Reuniao_ano_idx" ON "Reuniao"("ano");

-- CreateIndex
CREATE INDEX "Mes_nome_reuniaoId_idx" ON "Mes"("nome", "reuniaoId");

-- CreateIndex
CREATE UNIQUE INDEX "ReuniaoMensal_mesId_key" ON "ReuniaoMensal"("mesId");

-- CreateIndex
CREATE INDEX "ReuniaoMeioSemana_nameDate_reuniaoMensalId_idx" ON "ReuniaoMeioSemana"("nameDate", "reuniaoMensalId");

-- CreateIndex
CREATE INDEX "ReuniaoFimSemana_nameDate_reuniaoMensalId_idx" ON "ReuniaoFimSemana"("nameDate", "reuniaoMensalId");

-- CreateIndex
CREATE INDEX "Designacao_name_reuniaoMeioSemanaId_reuniaoFimSemanaId_idx" ON "Designacao"("name", "reuniaoMeioSemanaId", "reuniaoFimSemanaId");

-- CreateIndex
CREATE INDEX "Parte_name_designacaoId_memberId_suplenteMemberId_grupoId_idx" ON "Parte"("name", "designacaoId", "memberId", "suplenteMemberId", "grupoId");

-- CreateIndex
CREATE INDEX "BookDeOratoriaDeconselho_name_lesson_ponto_idx" ON "BookDeOratoriaDeconselho"("name", "lesson", "ponto");

-- CreateIndex
CREATE INDEX "grupo_nome_idx" ON "grupo"("nome");

-- CreateIndex
CREATE INDEX "membro_nome_idx" ON "membro"("nome");
