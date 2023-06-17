-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guild` (
    `guildId` VARCHAR(191) NOT NULL,
    `lvlNotify` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Guild_guildId_key`(`guildId`),
    PRIMARY KEY (`guildId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGuild` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `balance` INTEGER NOT NULL DEFAULT 50,
    `messageCount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `UserGuild_userId_guildId_key`(`userId`, `guildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserGuild` ADD CONSTRAINT `UserGuild_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGuild` ADD CONSTRAINT `UserGuild_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`guildId`) ON DELETE RESTRICT ON UPDATE CASCADE;
