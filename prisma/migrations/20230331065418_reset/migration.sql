-- CreateTable
CREATE TABLE "Showcase" (
    "id" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(140) NOT NULL,
    "description" VARCHAR(280) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "authorId" VARCHAR NOT NULL,

    CONSTRAINT "Showcase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Showcase_authorId_idx" ON "Showcase"("authorId");
