/*
  Warnings:

  - You are about to drop the column `Role` on the `Employees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "Role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'INTERN';
