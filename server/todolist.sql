SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

create table `account`(
	`ID` char(100) primary key,
    `name` char(100) default null,
    `username` char(100) default null,
    `password` char(100) default null,
    `email` char(100) default null,
    `type` int(10)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- data for account
insert into `account` (`ID`, `username`, `password`, `email`, `type`)
VALUES ('01', 'admin', '123', 'admin@gmail.com', 1),
	 ('02', 'user01', '123', 'us1@gmail.com', 2),
     ('03', 'user02', '123', 'us2@gmail.com', 1),
     ('04', 'user03', '123', 'us3@gmail.com', 2)