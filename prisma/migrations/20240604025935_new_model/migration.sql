/*
  Warnings:

  - You are about to drop the column `commentEditor` on the `Naskah` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Naskah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Naskah" DROP COLUMN "commentEditor",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AddForeignKey
ALTER TABLE "Naskah" ADD CONSTRAINT "Naskah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
