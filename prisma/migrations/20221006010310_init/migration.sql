/*
  Warnings:

  - You are about to drop the `_ChosenPlayerToTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ChosenPlayerToTeam";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TeamsOnPlayers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chosenPlayerId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    CONSTRAINT "TeamsOnPlayers_chosenPlayerId_fkey" FOREIGN KEY ("chosenPlayerId") REFERENCES "ChosenPlayer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamsOnPlayers_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
