/*
  Warnings:

  - You are about to drop the column `chosenPlayerId` on the `Points` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ChosenPlayersOnPoints" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chosenPlayerId" TEXT,
    "pointId" TEXT NOT NULL,
    CONSTRAINT "ChosenPlayersOnPoints_chosenPlayerId_fkey" FOREIGN KEY ("chosenPlayerId") REFERENCES "ChosenPlayer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ChosenPlayersOnPoints_pointId_fkey" FOREIGN KEY ("pointId") REFERENCES "Points" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Points" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Points" ("code", "id", "label", "value") SELECT "code", "id", "label", "value" FROM "Points";
DROP TABLE "Points";
ALTER TABLE "new_Points" RENAME TO "Points";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
