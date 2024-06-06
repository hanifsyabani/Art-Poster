/*
  Warnings:

  - Added the required column `abstrak` to the `Naskah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `Naskah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `Naskah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefiks` to the `Naskah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTitle` to the `Naskah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Naskah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Naskah" ADD COLUMN     "abstrak" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT NOT NULL,
ADD COLUMN     "prefiks" TEXT NOT NULL,
ADD COLUMN     "subTitle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" TEXT;
