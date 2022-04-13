/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invoice` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "invoiceId",
ADD COLUMN     "invoice" TEXT NOT NULL;

-- DropTable
DROP TABLE "Invoice";
