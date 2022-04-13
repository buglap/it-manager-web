/*
  Warnings:

  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direction` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "direction" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileId";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
