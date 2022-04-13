-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_positionId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "direction" DROP NOT NULL,
ALTER COLUMN "positionId" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
