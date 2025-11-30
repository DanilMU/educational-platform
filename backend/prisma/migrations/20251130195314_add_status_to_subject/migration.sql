/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SubjectStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "city",
DROP COLUMN "dob",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "status" "SubjectStatus" NOT NULL DEFAULT 'PUBLISHED';
