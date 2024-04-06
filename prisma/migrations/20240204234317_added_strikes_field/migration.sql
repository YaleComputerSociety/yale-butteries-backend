-- AlterTable
ALTER TABLE "college" ALTER COLUMN "isAcceptingOrders" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "strikes" INTEGER NOT NULL DEFAULT 0;
