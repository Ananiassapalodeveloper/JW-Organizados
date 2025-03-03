/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MidweekMeeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeekMeeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeekendMeeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LessonToStudent` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `career` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Member` table. All the data in the column will be lost.
  - Added the required column `genero` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MidweekMeeting_weekMeetingId_key";

-- DropIndex
DROP INDEX "WeekendMeeting_weekMeetingId_key";

-- DropIndex
DROP INDEX "_BookToStudent_B_index";

-- DropIndex
DROP INDEX "_BookToStudent_AB_unique";

-- DropIndex
DROP INDEX "_LessonToStudent_B_index";

-- DropIndex
DROP INDEX "_LessonToStudent_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assignment";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Book";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Lesson";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Meeting";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MidweekMeeting";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Point";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Report";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubPoint";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WeekMeeting";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WeekendMeeting";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookToStudent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_LessonToStudent";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "posicao" TEXT,
    "estado" TEXT,
    "privilegioServico" TEXT,
    "genero" TEXT NOT NULL,
    "carreira" TEXT,
    "funcao" TEXT
);
INSERT INTO "new_Member" ("id") SELECT "id" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
