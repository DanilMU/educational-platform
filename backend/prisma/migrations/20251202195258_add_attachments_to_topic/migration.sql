-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];
