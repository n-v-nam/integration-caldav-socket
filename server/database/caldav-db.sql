-- -----------------------------------------------------
-- Table `SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SERVICE`;
CREATE TABLE `SERVICE` (
                                       `id` BIGINT UNIQUE AUTO_INCREMENT,
                                       `service_code` VARCHAR(16) NOT NULL UNIQUE,
                                       `service_name` VARCHAR(255) NOT NULL,
                                       PRIMARY KEY (`id`)
);
-- -----------------------------------------------------
-- Table `USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
                              `id` BIGINT UNIQUE AUTO_INCREMENT,
                              `password` varchar(64) NOT NULL,
                              `token` varchar(256),
                              `username` varchar(16) NOT NULL UNIQUE,
                              `email` varchar(255) NOT NULL UNIQUE,
                              `code` varchar(6) NOT NULL UNIQUE,
                              `status` TINYINT(4) DEFAULT 0,
                              `expiration_date` TIMESTAMP NOT NULL,
                              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              PRIMARY KEY (id)
);
-- -----------------------------------------------------
-- Table `CONNECTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CONNECTION`;
CREATE TABLE `CONNECTION` (
                                `id` BIGINT UNIQUE AUTO_INCREMENT,
                                `mst_user_name` VARCHAR(16) NOT NULL,
                                `mst_service_code` VARCHAR(16) NOT NULL,
                                `token` varchar(2048) NOT NULL,
                                `account` VARCHAR(255) NOT NULL,
                                PRIMARY KEY (`id`),
                                CONSTRAINT `fk_user`
                                  FOREIGN KEY (`mst_user_name`)
                                      REFERENCES `USER` (`username`)
                                      ON DELETE NO ACTION
                                      ON UPDATE NO ACTION,
                                CONSTRAINT `fk_service`
                                  FOREIGN KEY (`mst_service_code`)
                                      REFERENCES `SERVICE` (`service_code`)
                                      ON DELETE NO ACTION
                                      ON UPDATE NO ACTION
);
-- -----------------------------------------------------
-- Table `NOTIFICATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `NOTIFICATION`;
CREATE TABLE `NOTIFICATION` (
                                        `id` BIGINT UNIQUE AUTO_INCREMENT,
                                        `mst_user_name` varchar(16) NOT NULL,
                                        `title` VARCHAR(64) NOT NULL,
                                        `content` VARCHAR(256) NOT NULL,
                                        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                        PRIMARY KEY (`id`),
                                        CONSTRAINT `fk_user_notify`
                                            FOREIGN KEY (`mst_user_name`)
                                                REFERENCES `USER` (`username`)
                                                ON DELETE NO ACTION
                                                ON UPDATE NO ACTION
);
INSERT INTO `user` (`id`, `username`, `password`) VALUES ('1', 'admin', 'admin')
