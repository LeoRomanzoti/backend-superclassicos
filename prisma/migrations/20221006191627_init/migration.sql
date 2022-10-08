-- CreateTable
CREATE TABLE "Points" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "chosenPlayerId" TEXT,
    CONSTRAINT "Points_chosenPlayerId_fkey" FOREIGN KEY ("chosenPlayerId") REFERENCES "ChosenPlayer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
