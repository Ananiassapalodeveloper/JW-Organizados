-- CreateTable
CREATE TABLE "HourLog1" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" DATETIME NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
