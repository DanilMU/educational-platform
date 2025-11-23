-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "attachments" TEXT[],
ADD COLUMN     "difficulty" INTEGER,
ADD COLUMN     "estimatedTime" INTEGER,
ADD COLUMN     "learningObjectives" TEXT,
ADD COLUMN     "order" INTEGER,
ADD COLUMN     "prerequisites" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "maxAttempts" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "passingScore" INTEGER NOT NULL DEFAULT 70,
ADD COLUMN     "shuffleAnswers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeLimit" INTEGER;

-- AlterTable
ALTER TABLE "user_progress" ADD COLUMN     "score" INTEGER,
ADD COLUMN     "timeSpent" INTEGER;
