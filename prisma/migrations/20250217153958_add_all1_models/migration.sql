/*
  Warnings:

  - You are about to drop the `Assistencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Atribuicao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Departamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Designacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Funcao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Licao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Membro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ponto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relatorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reuniao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `carreira` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `funcao` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `posicao` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `privilegioServico` on the `Member` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `age` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `career` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Departamento_nome_key";

-- DropIndex
DROP INDEX "Designacao_nome_key";

-- DropIndex
DROP INDEX "Livro_titulo_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assistencia";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Atribuicao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Departamento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Designacao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estudante";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Funcao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Licao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Livro";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Membro";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Ponto";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Relatorio";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Reuniao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "needs" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,
    CONSTRAINT "Student_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    CONSTRAINT "Lesson_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Point" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "lessonId" INTEGER NOT NULL,
    CONSTRAINT "Point_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "pointId" INTEGER NOT NULL,
    CONSTRAINT "SubPoint_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Point" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WeekMeeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weekStart" DATETIME NOT NULL,
    "weekEnd" DATETIME NOT NULL,
    "meetingId" INTEGER NOT NULL,
    CONSTRAINT "WeekMeeting_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MidweekMeeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "president" TEXT NOT NULL,
    "initialPrayer" TEXT NOT NULL,
    "speech" TEXT NOT NULL,
    "spiritualGems" TEXT NOT NULL,
    "bibleReading" TEXT NOT NULL,
    "startConversation" TEXT NOT NULL,
    "maintainInterest" TEXT NOT NULL,
    "explainBelief" TEXT NOT NULL,
    "makeDisciple" TEXT NOT NULL,
    "part1" TEXT NOT NULL,
    "part2" TEXT NOT NULL,
    "congregationBibleStudy" TEXT NOT NULL,
    "finalPrayer" TEXT NOT NULL,
    "weekMeetingId" INTEGER NOT NULL,
    CONSTRAINT "MidweekMeeting_weekMeetingId_fkey" FOREIGN KEY ("weekMeetingId") REFERENCES "WeekMeeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeekendMeeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "president" TEXT NOT NULL,
    "initialPrayer" TEXT NOT NULL,
    "speaker" TEXT NOT NULL,
    "studyConductor" TEXT NOT NULL,
    "studyReader" TEXT NOT NULL,
    "finalPrayer" TEXT NOT NULL,
    "weekMeetingId" INTEGER NOT NULL,
    CONSTRAINT "WeekendMeeting_weekMeetingId_fkey" FOREIGN KEY ("weekMeetingId") REFERENCES "WeekMeeting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,
    CONSTRAINT "Assignment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "studiesConducted" INTEGER NOT NULL,
    "hoursSpent" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    CONSTRAINT "Report_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LessonToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LessonToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LessonToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'BAPTIZED',
    "department" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Member" ("id") SELECT "id" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "MidweekMeeting_weekMeetingId_key" ON "MidweekMeeting"("weekMeetingId");

-- CreateIndex
CREATE UNIQUE INDEX "WeekendMeeting_weekMeetingId_key" ON "WeekendMeeting"("weekMeetingId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToStudent_AB_unique" ON "_BookToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToStudent_B_index" ON "_BookToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToStudent_AB_unique" ON "_LessonToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_LessonToStudent_B_index" ON "_LessonToStudent"("B");
