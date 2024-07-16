-- CreateEnum
CREATE TYPE "CovidStatus" AS ENUM ('COVID', 'NO_COVID');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATTENDED', 'NOT_ATTENDED');

-- CreateTable
CREATE TABLE "Citizen" (
    "id" TEXT NOT NULL,
    "serial" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "serial" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIME NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_ATTENDED',
    "conclusion" "CovidStatus",
    "citizenId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_citizenId_key" ON "Schedule"("citizenId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_citizenId_fkey" FOREIGN KEY ("citizenId") REFERENCES "Citizen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
