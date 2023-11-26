-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_createdById_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
