-- CreateTable
CREATE TABLE "Membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "sexo" TEXT NOT NULL DEFAULT 'Masculino',
    "cargo" TEXT,
    "estado" TEXT NOT NULL,
    "carreira" TEXT
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Funcao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "membroId" TEXT NOT NULL,
    "departamentoId" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    CONSTRAINT "Funcao_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Funcao_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estudante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "necessidades" TEXT
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Licao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "livroId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    CONSTRAINT "Licao_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ponto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "licaoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    CONSTRAINT "Ponto_licaoId_fkey" FOREIGN KEY ("licaoId") REFERENCES "Licao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reuniao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Designacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "tipoReuniao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Atribuicao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reuniaoId" TEXT NOT NULL,
    "designacaoId" TEXT NOT NULL,
    "membro1Id" TEXT NOT NULL,
    "membro2Id" TEXT,
    CONSTRAINT "Atribuicao_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atribuicao_designacaoId_fkey" FOREIGN KEY ("designacaoId") REFERENCES "Designacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atribuicao_membro1Id_fkey" FOREIGN KEY ("membro1Id") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "membroId" TEXT NOT NULL,
    "mes" TEXT NOT NULL,
    "estudosDirigidos" INTEGER NOT NULL DEFAULT 0,
    "horasGastas" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Relatorio_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assistencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reuniaoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "Assistencia_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nome_key" ON "Departamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Livro_titulo_key" ON "Livro"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Designacao_nome_key" ON "Designacao"("nome");
