/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/

/*
  Start Develop by nuk
*/
UPDATE "User" SET "password" = 'changeme' WHERE "password" IS NULL;
/*
  End Develop by nuk
*/

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
