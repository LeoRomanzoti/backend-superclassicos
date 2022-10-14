-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "open" BOOLEAN NOT NULL
);
INSERT INTO "new_Round" ("end_date", "id", "number", "open", "start_date") SELECT "end_date", "id", "number", "open", "start_date" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
