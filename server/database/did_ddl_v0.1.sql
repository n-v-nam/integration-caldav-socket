-- SHOW TABLES;
-- -----------------------------------------------------
-- Table `SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SERVICE`;
CREATE TABLE `SERVICE` (
                                       `service_code` VARCHAR(16) NOT NULL UNIQUE,
                                       `service_name` VARCHAR(255) NOT NULL COMMENT 'サービスコード',
                                       `service_url` VARCHAR(255) NOT NULL COMMENT 'サービス側のURL',
                                       `status` TINYINT NOT NULL DEFAULT 1 COMMENT '0：利用できない1：利用できる',
                                       `creater` VARCHAR(255) NOT NULL COMMENT '作成者',
                                       `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
                                       `updater` VARCHAR(255) NOT NULL,
                                       `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新日',
                                       PRIMARY KEY (`service_code`)
)
    COMMENT = 'サービスマスタテーブル';
    -- -----------------------------------------------------
-- Table `USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
                              `service_user_code` varchar(16) NOT NULL UNIQUE COMMENT 'サービスユーザコード',
                              `mst_service_code` varchar(16) NOT NULL COMMENT 'マスタサービスコード',
                              `user_code` varchar(16) NOT NULL COMMENT 'ユーザコード',
                              `user_name` varchar(255) NOT NULL COMMENT 'ユーザ名',
                              `mail` varchar(255) NOT NULL COMMENT 'メールアドレス',
                              `status` varchar(255) NOT NULL COMMENT 'ステータス',
                              `client_id` varchar(16) UNIQUE COMMENT 'マスタDIDクライアントID',
                              `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
                              `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新日時',
                              PRIMARY KEY (`mst_service_code`, `user_code`),
                              CONSTRAINT `fk_servicecode`
                                  FOREIGN KEY (`mst_service_code`)
                                      REFERENCES `SERVICE` (`service_code`)
                                      ON DELETE NO ACTION
                                      ON UPDATE NO ACTION
                              )
    COMMENT = 'ユーザテーブル';
-- select * from USER;
-- -----------------------------------------------------
-- Table `BLOCK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BLOCK`;
CREATE TABLE `BLOCK` (
                                `block_no` INT NOT NULL UNIQUE,
                                `mst_client_id` VARCHAR(16) COMMENT 'DIDクライアントID',
                                `status` VARCHAR(255) COMMENT 'ステータス',
                                `expiration_date` TIMESTAMP COMMENT '有効期限',
                                `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
                                `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '有効期限',
                                PRIMARY KEY (`block_no`),
                                CONSTRAINT `fk_user_client`
                                  FOREIGN KEY (`mst_client_id`)
                                      REFERENCES `USER` (`client_id`)
                                      ON DELETE NO ACTION
                                      ON UPDATE NO ACTION
                                )
    COMMENT = 'ブロックテーブル';
-- select * from BLOCK;
-- -----------------------------------------------------
-- Table `CERT_LOG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CERT_LOG`;
CREATE TABLE `CERT_LOG` (
                                        `id` BIGINT NOT NULL AUTO_INCREMENT,
                                        `mst_service_code` varchar(16) NOT NULL COMMENT 'サービスID',
                                        `block_no` INT NOT NULL COMMENT 'サービスID',
                                        `request_code` VARCHAR(32) NOT NULL COMMENT  'リクエストコード',
                                        `phase` TINYINT NOT NULL COMMENT  'リクエストコード',
                                        `result` TINYINT NOT NULL COMMENT  'リクエストコード',
                                        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
                                        PRIMARY KEY (`id`),
                                        CONSTRAINT `fk_log_service_code`
                                            FOREIGN KEY (`mst_service_code`)
                                                REFERENCES `SERVICE` (`service_code`)
                                                ON DELETE NO ACTION
                                                ON UPDATE NO ACTION)
    COMMENT = '認証ログテーブル';
-- select * from CERT_LOG;
-- -----------------------------------------------------
-- Table `URL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `URL`;
CREATE TABLE `URL` (
                                `id` BIGINT NOT NULL AUTO_INCREMENT,
                                `mst_service_user_code` VARCHAR(16) NOT NULL COMMENT 'サービスユーザコード',
                                `issue_purpose` VARCHAR(16) NOT NULL COMMENT '発行の目的',
                                `hash` VARCHAR(16) NOT NULL COMMENT 'ハッシュ値',
                                `download_code` VARCHAR(6) COMMENT 'ダウンロードコード',
                                `expiration_date` TIMESTAMP COMMENT '有効期限',
                                `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日',
                                `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '有効期限',
                                PRIMARY KEY (`id`),
                                CONSTRAINT `fk_userid_url`
                                    FOREIGN KEY (`mst_service_user_code`)
                                        REFERENCES `USER` (`service_user_code`)
                                        ON DELETE NO ACTION
                                        ON UPDATE NO ACTION)
    COMMENT = 'URL発行';
-- select * from URL;
-- -----------------------------------------------------
-- Table `REQUEST_HISTORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `REQUEST_HISTORY`;
CREATE TABLE `REQUEST_HISTORY` (
                                `id` BIGINT NOT NULL,
                                `issue_purpose` VARCHAR(16) NOT NULL COMMENT '発行の目的',
                                `request_code` VARCHAR(16) NOT NULL COMMENT 'リクエストコード',
                                `mst_service_user_code` VARCHAR(16) COMMENT 'マスタサービスユーザコード',
                                `expiration_date` TIMESTAMP COMMENT '有効期限',
                                `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
                                `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新日時',
                                PRIMARY KEY (`id`),
                                CONSTRAINT `fk_userid_req`
                                    FOREIGN KEY (`mst_service_user_code`)
                                        REFERENCES `USER` (`service_user_code`)
                                        ON DELETE NO ACTION
                                        ON UPDATE NO ACTION)
    COMMENT = 'リクエストコード発行履歴';
-- select * from REQUEST_HISTORY;



