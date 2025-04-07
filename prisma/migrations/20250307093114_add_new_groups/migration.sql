-- CreateTable
CREATE TABLE "grupo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dirigenteId" TEXT,
    "ajudanteId" TEXT,
    CONSTRAINT "grupo_dirigenteId_fkey" FOREIGN KEY ("dirigenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "grupo_ajudanteId_fkey" FOREIGN KEY ("ajudanteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "contacto" TEXT,
    "dataNascimento" TEXT,
    "dataMatricula" TEXT,
    "dataPublicador" TEXT,
    "dataBaptismo" TEXT,
    "dataAuxiliar" TEXT,
    "dataRegular" TEXT,
    "descricao" TEXT,
    "estadoId" TEXT,
    "carreiraId" TEXT,
    "dadivaId" TEXT,
    "grupoId" TEXT,
    CONSTRAINT "membro_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_carreiraId_fkey" FOREIGN KEY ("carreiraId") REFERENCES "carreira" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_dadivaId_fkey" FOREIGN KEY ("dadivaId") REFERENCES "dadiva" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "membro_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_membro" ("carreiraId", "contacto", "dadivaId", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estadoId", "id", "nome") SELECT "carreiraId", "contacto", "dadivaId", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estadoId", "id", "nome" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_nome_key" ON "membro"("nome");
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "grupo_nome_key" ON "grupo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "grupo_dirigenteId_key" ON "grupo"("dirigenteId");

-- CreateIndex
CREATE UNIQUE INDEX "grupo_ajudanteId_key" ON "grupo"("ajudanteId");
