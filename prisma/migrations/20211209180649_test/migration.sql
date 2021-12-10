/*
  Warnings:

  - You are about to drop the column `role_PermissionsId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role_Permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_role_PermissionsId_fkey";

-- DropForeignKey
ALTER TABLE "Role_Permissions" DROP CONSTRAINT "Role_Permissions_permissionsId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role_PermissionsId",
ADD COLUMN     "permissions" JSONB;

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "Role_Permissions";
