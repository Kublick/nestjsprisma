/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `objectsId` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Permissions` table. All the data in the column will be lost.
  - You are about to drop the `Objects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_objectsId_fkey";

-- AlterTable
ALTER TABLE "Permissions" DROP COLUMN "createdAt",
DROP COLUMN "objectsId",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Objects";
