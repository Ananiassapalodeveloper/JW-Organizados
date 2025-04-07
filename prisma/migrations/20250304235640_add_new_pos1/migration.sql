/*
  Warnings:

  - You are about to drop the `_MembersTocarreira` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MembersToestado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MembersToservico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_posicaoToservico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_MembersTocarreira_B_index";

-- DropIndex
DROP INDEX "_MembersTocarreira_AB_unique";

-- DropIndex
DROP INDEX "_MembersToestado_B_index";

-- DropIndex
DROP INDEX "_MembersToestado_AB_unique";

-- DropIndex
DROP INDEX "_MembersToservico_B_index";

-- DropIndex
DROP INDEX "_MembersToservico_AB_unique";

-- DropIndex
DROP INDEX "_posicaoToservico_B_index";

-- DropIndex
DROP INDEX "_posicaoToservico_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MembersTocarreira";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MembersToestado";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MembersToservico";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_posicaoToservico";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "posicao_do_member1" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "posicao" TEXT NOT NULL,
    "descricao" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_members" (
    "MembroId" TEXT NOT NULL PRIMARY KEY,
    "NomeMembro" TEXT NOT NULL,
    "PontoAdicional" TEXT,
    "DataMatricula" TEXT,
    "IsMatriculado" BOOLEAN DEFAULT false,
    "DataPioneiroAuxiliar" TEXT,
    "IsAuxiliar" BOOLEAN DEFAULT false,
    "DataPioneiroRegular" TEXT,
    "IsRegular" BOOLEAN DEFAULT false,
    "DataBaptismo" TEXT,
    "IsBaptizado" BOOLEAN DEFAULT false,
    "DataNascimento" TEXT,
    "Email" TEXT,
    "contacto" TEXT,
    "dadivasHomemId" TEXT,
    "carreiraId" TEXT,
    "estadoId" TEXT,
    "servicoId" TEXT,
    CONSTRAINT "members_dadivasHomemId_fkey" FOREIGN KEY ("dadivasHomemId") REFERENCES "dadivasHomem_do_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "members_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira_do_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "members_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado_do_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "members_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servico_do_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_members" ("DataBaptismo", "DataMatricula", "DataNascimento", "DataPioneiroAuxiliar", "DataPioneiroRegular", "Email", "IsAuxiliar", "IsBaptizado", "IsMatriculado", "IsRegular", "MembroId", "NomeMembro", "PontoAdicional", "carreiraId", "contacto", "dadivasHomemId", "estadoId") SELECT "DataBaptismo", "DataMatricula", "DataNascimento", "DataPioneiroAuxiliar", "DataPioneiroRegular", "Email", "IsAuxiliar", "IsBaptizado", "IsMatriculado", "IsRegular", "MembroId", "NomeMembro", "PontoAdicional", "carreiraId", "contacto", "dadivasHomemId", "estadoId" FROM "members";
DROP TABLE "members";
ALTER TABLE "new_members" RENAME TO "members";
CREATE UNIQUE INDEX "members_Email_key" ON "members"("Email");
CREATE TABLE "new_servico_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servico" TEXT NOT NULL,
    "descricao" TEXT,
    "posicaoId" TEXT NOT NULL,
    CONSTRAINT "servico_do_member_posicaoId_fkey" FOREIGN KEY ("posicaoId") REFERENCES "posicao_do_member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_servico_do_member" ("descricao", "id", "posicaoId", "servico") SELECT "descricao", "id", "posicaoId", "servico" FROM "servico_do_member";
DROP TABLE "servico_do_member";
ALTER TABLE "new_servico_do_member" RENAME TO "servico_do_member";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
