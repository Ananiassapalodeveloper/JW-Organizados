-- CreateTable
CREATE TABLE "members" (
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
    CONSTRAINT "members_dadivasHomemId_fkey" FOREIGN KEY ("dadivasHomemId") REFERENCES "dadivasHomem_do_member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dadivasHomem_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dadivas" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "carreira_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carreira" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "estado_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estado" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "servico_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servico" TEXT NOT NULL,
    "descricao" TEXT,
    "posicaoId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "posicao_do_member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "posicao" TEXT NOT NULL,
    "descricao" TEXT
);

-- CreateTable
CREATE TABLE "_MembersTocarreira" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MembersTocarreira_A_fkey" FOREIGN KEY ("A") REFERENCES "members" ("MembroId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MembersTocarreira_B_fkey" FOREIGN KEY ("B") REFERENCES "carreira_do_member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MembersToestado" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MembersToestado_A_fkey" FOREIGN KEY ("A") REFERENCES "members" ("MembroId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MembersToestado_B_fkey" FOREIGN KEY ("B") REFERENCES "estado_do_member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MembersToservico" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MembersToservico_A_fkey" FOREIGN KEY ("A") REFERENCES "members" ("MembroId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MembersToservico_B_fkey" FOREIGN KEY ("B") REFERENCES "servico_do_member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_posicaoToservico" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_posicaoToservico_A_fkey" FOREIGN KEY ("A") REFERENCES "posicao_do_member" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_posicaoToservico_B_fkey" FOREIGN KEY ("B") REFERENCES "servico_do_member" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "members_Email_key" ON "members"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "_MembersTocarreira_AB_unique" ON "_MembersTocarreira"("A", "B");

-- CreateIndex
CREATE INDEX "_MembersTocarreira_B_index" ON "_MembersTocarreira"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MembersToestado_AB_unique" ON "_MembersToestado"("A", "B");

-- CreateIndex
CREATE INDEX "_MembersToestado_B_index" ON "_MembersToestado"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MembersToservico_AB_unique" ON "_MembersToservico"("A", "B");

-- CreateIndex
CREATE INDEX "_MembersToservico_B_index" ON "_MembersToservico"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_posicaoToservico_AB_unique" ON "_posicaoToservico"("A", "B");

-- CreateIndex
CREATE INDEX "_posicaoToservico_B_index" ON "_posicaoToservico"("B");
