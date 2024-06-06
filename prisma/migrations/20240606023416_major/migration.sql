/*
  Warnings:

  - Added the required column `major` to the `Naskah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Naskah" ADD COLUMN     "major" TEXT NOT NULL;
