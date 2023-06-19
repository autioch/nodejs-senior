-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifyCode" TEXT;
