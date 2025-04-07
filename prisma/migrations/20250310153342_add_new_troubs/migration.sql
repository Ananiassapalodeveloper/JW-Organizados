-- AlterTable
ALTER TABLE "membro" ADD COLUMN "studentsId" TEXT;

-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "date" DATETIME,
    "bookId" TEXT,
    "membroId" TEXT NOT NULL,
    "membroReferenteId" TEXT,
    CONSTRAINT "Students_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookStudying" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Students_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Students_membroReferenteId_fkey" FOREIGN KEY ("membroReferenteId") REFERENCES "membro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "isCorrected" BOOLEAN NOT NULL DEFAULT false,
    "studentId" TEXT NOT NULL,
    "membroId" TEXT NOT NULL,
    CONSTRAINT "Tasks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Tasks_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "membro" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookStudying" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lesson" TEXT,
    "point" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_membroReferenteId_key" ON "Students"("membroReferenteId");
