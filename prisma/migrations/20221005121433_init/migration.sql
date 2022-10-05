/*
  Warnings:

  - Added the required column `score` to the `ChosenPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChosenPlayer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "ChosenPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChosenPlayer_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChosenPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChosenPlayer" ("id", "playerId", "roundId", "teamId") SELECT "id", "playerId", "roundId", "teamId" FROM "ChosenPlayer";
DROP TABLE "ChosenPlayer";
ALTER TABLE "new_ChosenPlayer" RENAME TO "ChosenPlayer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
