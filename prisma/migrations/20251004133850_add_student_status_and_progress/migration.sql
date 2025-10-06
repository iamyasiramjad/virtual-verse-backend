-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('READING', 'PAUSED', 'COMPLETED', 'LEFT_UNCOMPLETED');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency" TEXT,
ADD COLUMN     "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'READING',
ADD COLUMN     "tuitionFee" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "StudentProgress" ADD COLUMN     "revisionCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CompletionRecord" (
    "id" SERIAL NOT NULL,
    "completedItem" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "CompletionRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletionRecord" ADD CONSTRAINT "CompletionRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
