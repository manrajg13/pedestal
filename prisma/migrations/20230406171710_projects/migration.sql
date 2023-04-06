/*
  Warnings:

  - You are about to drop the column `description` on the `Showcase` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Showcase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(140)` to `VarChar(60)`.
  - You are about to alter the column `type` on the `Showcase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Showcase" DROP COLUMN "description",
ALTER COLUMN "title" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "type" SET DATA TYPE VARCHAR(20);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "tags" VARCHAR(40) NOT NULL,
    "image" VARCHAR(40) NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
