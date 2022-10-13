/*
  Warnings:

  - You are about to drop the column `end_data` on the `Round` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);
INSERT INTO "new_Round" ("id", "number", "start_date") SELECT "id", "number", "start_date" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
