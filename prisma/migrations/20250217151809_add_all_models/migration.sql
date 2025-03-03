-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atribuicao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reuniaoId" TEXT NOT NULL,
    "designacaoId" TEXT NOT NULL,
    "membro1Id" TEXT NOT NULL,
    "membro2Id" TEXT,
    CONSTRAINT "Atribuicao_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atribuicao_designacaoId_fkey" FOREIGN KEY ("designacaoId") REFERENCES "Designacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atribuicao_membro1Id_fkey" FOREIGN KEY ("membro1Id") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Atribuicao_membro2Id_fkey" FOREIGN KEY ("membro2Id") REFERENCES "Membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Atribuicao" ("designacaoId", "id", "membro1Id", "membro2Id", "reuniaoId") SELECT "designacaoId", "id", "membro1Id", "membro2Id", "reuniaoId" FROM "Atribuicao";
DROP TABLE "Atribuicao";
ALTER TABLE "new_Atribuicao" RENAME TO "Atribuicao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
