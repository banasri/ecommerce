/*
  Warnings:

  - Added the required column `short_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `short_name` VARCHAR(191) NOT NULL;
