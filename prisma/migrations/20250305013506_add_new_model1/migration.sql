/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carreira_do_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dadivasHomem_do_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estado_do_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posicao_do_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posicao_do_member1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico_do_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "carreira_do_member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "dadivasHomem_do_member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "estado_do_member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "members";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "posicao_do_member";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "posicao_do_member1";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "servico_do_member";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "contacto" TEXT,
    "dataBaptismo" TEXT,
    "dataNascimento" TEXT,
    "isBaptizado" BOOLEAN NOT NULL DEFAULT false,
    "estadoId" TEXT,
    "carreiraId" TEXT,
    "dadivaId" TEXT,
    CONSTRAINT "membro_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_dadivaId_fkey" FOREIGN KEY ("dadivaId") REFERENCES "dadiva" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "servico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "posicao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "servico_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "membroId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "posicaoId" TEXT NOT NULL,
    CONSTRAINT "servico_membro_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "servico_membro_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servico" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "servico_membro_posicaoId_fkey" FOREIGN KEY ("posicaoId") REFERENCES "posicao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "estado" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "carreira" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "dadiva" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "servico_membro_membroId_servicoId_key" ON "servico_membro"("membroId", "servicoId");
