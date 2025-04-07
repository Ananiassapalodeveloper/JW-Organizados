-- CreateTable
CREATE TABLE "Ano" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ano" INTEGER NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "Meses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes" INTEGER NOT NULL,
    "descricao" TEXT,
    "AnosId" TEXT,
    CONSTRAINT "Meses_AnosId_fkey" FOREIGN KEY ("AnosId") REFERENCES "Ano" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FourRenionDate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "mesId" TEXT,
    CONSTRAINT "FourRenionDate_mesId_fkey" FOREIGN KEY ("mesId") REFERENCES "Meses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartesInicias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "PartesInicias_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesInicias_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tesouros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Dicursos',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Tesouros_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tesouros_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ministerio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'IniciarConversa1',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Ministerio_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ministerio_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cristao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Dicursos',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Cristao_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cristao_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartesFinais" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "PartesFinais_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesFinais_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartesFinais_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReuniaoPublica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "ReuniaoPublica_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ReuniaoPublica_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sentinela" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Presidente & oração inicial',
    "memberId" TEXT,
    "tema" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Sentinela_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Sentinela_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Indicadores" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "memberId" TEXT,
    "suplenteMemberId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Indicadores_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_suplenteMemberId_fkey" FOREIGN KEY ("suplenteMemberId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Indicadores_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Arrumacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "grupoId" TEXT,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Arrumacao_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Arrumacao_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assistencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "fourRenionDateId" TEXT NOT NULL,
    CONSTRAINT "Assistencia_fourRenionDateId_fkey" FOREIGN KEY ("fourRenionDateId") REFERENCES "FourRenionDate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ano_ano_key" ON "Ano"("ano");

-- CreateIndex
CREATE UNIQUE INDEX "Meses_mes_key" ON "Meses"("mes");
