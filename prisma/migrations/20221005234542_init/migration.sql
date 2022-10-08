/*
  Warnings:

  - You are about to drop the column `teamId` on the `ChosenPlayer` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ChosenPlayerToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ChosenPlayerToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "ChosenPlayer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChosenPlayerToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChosenPlayer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "ChosenPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChosenPlayer_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChosenPlayer" ("id", "playerId", "roundId", "score") SELECT "id", "playerId", "roundId", "score" FROM "ChosenPlayer";
DROP TABLE "ChosenPlayer";
ALTER TABLE "new_ChosenPlayer" RENAME TO "ChosenPlayer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ChosenPlayerToTeam_AB_unique" ON "_ChosenPlayerToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ChosenPlayerToTeam_B_index" ON "_ChosenPlayerToTeam"("B");
