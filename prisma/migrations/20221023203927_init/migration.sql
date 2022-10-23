-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "scopes" TEXT NOT NULL DEFAULT '[admin,]'
);
INSERT INTO "new_User" ("id", "name", "phone") SELECT "id", "name", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
