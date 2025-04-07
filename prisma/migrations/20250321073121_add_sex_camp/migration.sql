-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_membro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "contacto" TEXT,
    "dataNascimento" DATETIME,
    "dataMatricula" DATETIME,
    "dataPublicador" DATETIME,
    "dataBaptismo" DATETIME,
    "dataAuxiliar" DATETIME,
    "dataRegular" DATETIME,
    "descricao" TEXT,
    "studentsId" TEXT,
    "sexo" TEXT NOT NULL DEFAULT 'M',
    "estado" TEXT NOT NULL DEFAULT 'BATIZADO',
    "carreira" TEXT,
    "dadiva" TEXT,
    "grupoId" TEXT,
    CONSTRAINT "membro_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_membro" ("carreira", "contacto", "dadiva", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estado", "grupoId", "id", "nome", "studentsId") SELECT "carreira", "contacto", "dadiva", "dataAuxiliar", "dataBaptismo", "dataMatricula", "dataNascimento", "dataPublicador", "dataRegular", "descricao", "email", "estado", "grupoId", "id", "nome", "studentsId" FROM "membro";
DROP TABLE "membro";
ALTER TABLE "new_membro" RENAME TO "membro";
CREATE UNIQUE INDEX "membro_nome_key" ON "membro"("nome");
CREATE UNIQUE INDEX "membro_email_key" ON "membro"("email");
CREATE INDEX "membro_nome_idx" ON "membro"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
