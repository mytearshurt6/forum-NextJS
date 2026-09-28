/*
  Warnings:

  - Made the column `community_logo` on table `communities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "communities" ALTER COLUMN "community_logo" SET NOT NULL;
