INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Paramore', '2015-04-12', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Billie Eilish', '2015-08-15', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Nirvana', '2001-02-18', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Tenacious D', '2013-04-16', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Avenged Sevenfold', '2010-08-05', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Eminem', '2011-06-14', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Breaking Benjamin', '2014-07-05', 'imgdotcom');

INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('LP', '2008-04-12', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Akon', '2004-08-15', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Rise Against', '2001-02-18', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Papa Roach', '1998-04-16', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Radio Head', '1994-08-05', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Panic! At The Disco', '2000-06-14', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Hozier', '2014-07-05', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Fleetwood Mac', '1998-04-16', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Jack Johnson', '1994-08-05', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('David Bowie', '2011-06-14', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('I Prevail', '2014-07-05', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('Eagles', '2004-08-15', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('The Pretty Reckless', '2001-02-18', 'imgdotcom');
INSERT INTO `music_service`.`artists` (`name`, `uploaded_at`, `cover_img`) VALUES ('OneRepublic', '1998-04-16', 'imgdotcom');

SELECT * FROM music_service.artists;

INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('By the way', '2009-01-01', '2009-01-01', 'imgdotcom', '2');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Lost With All Hands', '2019-02-01', '2020-01-01', 'imgdotcom', '3');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Brand New Eyes', '2015-01-01', '2015-01-01', 'imgdotcom', '4');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('dont smile at me', '2017-01-01', '2017-01-01', 'imgdotcom', '5');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Nevermind', '1991-01-01', '1991-01-01', 'imgdotcom', '6');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Tenacious D', '2001-01-01', '2001-01-01', 'imgdotcom', '7');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Avenged Sevenfold', '2007-01-01', '2007-01-01', 'imgdotcom', '8');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Recovery', '2010-01-01', '2010-01-01', 'imgdotcom', '9');
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Phobia', '2006-01-01', '2006-01-01', 'imgdotcom', '10');

-- need to add songs to these 
INSERT INTO `music_service`.`albums` (`name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Nightmare', '2010-02-02', '2010-01-02', 'imgdotcom', '8');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Lost on You', '2016-01-02', '2016-02-02', 'imgdotcom', '11');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Konvicted', '2006-01-02', '2016-02-02', 'imgdotcom', '12');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Endgame', '2011-01-02', '2011-02-02', 'imgdotcom', '13');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Appeal To Reason', '2008-01-02', '2008-02-02', 'imgdotcom', '13');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'F.E.A.R', '2015-01-02', '2015-02-02', 'imgdotcom', '14');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Pablo Honey', '1993-01-02', '1993-02-02', 'imgdotcom', '15');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Pretty. Odd.', '2008-01-02', '2008-02-02', 'imgdotcom', '16');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Too Weird to Live, Too Rare to Die!', '2013-01-02', '2013-02-02', 'imgdotcom', '16');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Death of a Bachelor', '2016-01-02', '2016-02-02', 'imgdotcom', '16');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Hozier', '2014-01-02', '2014-02-02', 'imgdotcom', '17');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Rumours', '1977-01-02', '1999-02-02', 'imgdotcom', '18');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('In Between Dreams', '2005-01-02', '2005-02-02', 'imgdotcom', '19');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'ChangesOneBowie', '1976-01-02', '2016-02-02', 'imgdotcom', '20');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('TRAUMA', '2019-01-02', '2019-02-02', 'imgdotcom', '21');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ( 'Hotel California', '1976-01-02', '2013-02-02', 'imgdotcom', '22');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Light Me Up', '2010-01-02', '2010-02-02', 'imgdotcom', '23');
INSERT INTO `music_service`.`albums` ( `name`, `created_at`, `uploaded_at`, `cover_img`, `artist_id`) VALUES ('Waking Up', '2009-01-02', '2009-02-02', 'imgdotcom', '24');
SELECT * FROM music_service.albums;

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('The Pretender', 'https://youtu.be/SBjQ9tuuTJQ', '04:30', '2009-01-01', 'to be added', '2009-01-01', '1', '1');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('All My Life', 'https://youtu.be/xQ04WbgI9rg', '04:44', '2009-01-01', 'to be added', '2009-01-01', '1', '1');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Everlong', 'https://youtu.be/eBG7P-K-r1Y', '04:49', '2009-01-01', 'to be added', '2009-01-01', '1', '1');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Cant Stop', 'https://youtu.be/8DyziWtkfBw', '04:37', '2002-01-01', 'to be added', '2009-01-01', '2', '2');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('By The Way', 'https://youtu.be/JnfyjwChuNU', '03:37', '2002-01-01', 'to be added', '2009-01-01', '2', '2');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('This Is The Place', 'https://youtu.be/gqgm7ViA2Ag', '04:30', '2002-01-01', 'to be added', '2009-01-01', '2', '2');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Never Mine', 'https://youtu.be/zk3bQ3CJNg4', '03:45', '2020-01-01', 'to be added', '2009-01-01', '3', '3');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Coffee Stains', 'https://youtu.be/5kDr5863BoI', '03:14', '2020-01-01', 'to be added', '2009-01-01', '3', '3');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Oh Sister', 'https://youtu.be/YSg9qE-oDGU', '03:30', '2020-01-01', 'to be added', '2009-01-01', '3', '3');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Misguided Ghosts', 'https://youtu.be/oGWeHPK3NC4', '02:58', '2009-01-01', 'to be added', '2009-01-01', '4', '4');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('All I Wanted', 'https://youtu.be/W7nmB20qJv4', '03:45', '2009-01-01', 'to be added', '2009-01-01', '4', '4');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Where The Lines Overlap', 'https://youtu.be/blDjUkMA9oU', '03:16', '2009-01-01', 'to be added', '2009-01-01', '4', '4');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('myboy', 'https://youtu.be/dVUmSgzgOqs', '02:50', '2017-01-01', 'to be added', '2009-01-01', '5', '5');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('party favor', 'https://youtu.be/tGHTOVw6F4Q', '03:23', '2017-01-01', 'to be added', '2009-01-01', '5', '5');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('idontwannabeyouanymore', 'https://youtu.be/-tn2S3kJlyU', '03:24', '2017-01-01', 'to be added', '2009-01-01', '5', '5');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Come As You Are', 'https://youtu.be/vabnZ9-ex7o', '03:45', '1991-02-03', 'to be added', '1990-02-01', '6', '6');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Smells Like Teen Spirit', 'https://youtu.be/hTWKbfoikeg', '04:38', '1991-02-03', 'to be added', '1990-02-01', '6', '6');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Lithium', 'https://youtu.be/LYfnBsaTVEo', '04:17', '1991-02-03', 'to be added', '1990-02-01', '6', '6');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Tribute', 'https://youtu.be/_lK4cX5xGiQ', '04:52', '2001-02-02', 'to be added', '2001-01-02', '7', '7');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Wonderboy', 'https://youtu.be/FL4HSiGvk68', '04:31', '2001-02-02', 'to be added', '2001-01-02', '7', '7');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Kielbasa', 'https://youtu.be/7LBxr5ZScqE', '03:00', '2001-02-02', 'to be added', '2001-01-02', '7', '7');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Dear God', 'https://youtu.be/mzX0rhF8buo', '04:42', '2007-02-02', 'to be added', '2007-01-02', '8', '8');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('So Far Away', 'https://youtu.be/A7ry4cx6HfY', '05:28', '2010-02-02', 'to be added', '2010-01-02', '11', '8');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Buried Alive', 'https://youtu.be/imwmmv9r1oE', '06:47', '2010-02-02', 'to be added', '2010-01-02', '11', '8');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Gunslinger', 'https://youtu.be/3vDetD8cW_o', '04:11', '2007-02-02', 'to be added', '2007-01-02', '8', '8');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Space Bound', 'https://youtu.be/JByDbPn6A1o', '04:24', '2010-02-02', 'to be added', '2010-01-02', '9', '9');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Love The Way You Lie', 'https://youtu.be/uelHwf8o7_U', '04:26', '2010-02-02', 'to be added', '2010-01-02', '9', '9');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Not Afraid', 'https://youtu.be/j5-yKhDd64s', '04:18', '2010-02-02', 'to be added', '2010-01-02', '9', '9');

INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Evil Angel', 'https://youtu.be/Wjrh8vid0IE', '03:40', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Unknown Soldier', 'https://youtu.be/SQl3waLGR4s', '03:42', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('The Diary Of Jane', 'https://youtu.be/DWaB4PXCwFU', '03:27', '2009-02-02', 'to be added', '2009-01-02', '10', '10');
INSERT INTO `music_service`.`songs` (`title`, `youtube_link`, `length`, `uploaded_at`, `lyrics`, `created_at`, `album_id`, `artist_id`) VALUES ('Breath', 'https://youtu.be/Ib9swdvt3mA', '03:38', '2009-02-02', 'to be added', '2009-01-02', '10', '10');


SELECT * FROM music_service.songs;

INSERT INTO music_service.songs_in_album(`album_id`,`song_id`)
SELECT `album_id`,`song_id` FROM music_service.songs;

INSERT INTO music_service.songs_in_playlist(`playlist_id`,`song_id`)
VALUES ('3','1'),('3','2'),('3','3'),('3','4'),('3','5'),('1','1'),('1','7'),('1','3'),('1','8'),('1','15'),('2','2'),('2','3'),('2','6'),('1','11');

-- MOCK USERS
INSERT INTO `Users` VALUES ('1','donald70@example.net','2006-12-01','2018-03-14','2597e87fb979dc7a8f5e98a5d98bc213ba8120cd','1',NULL,NULL),
('2','lacy.daugherty@example.com','1970-09-27','2016-05-16','010a01978d1e342e665ef7e57143d0dde4c7ac0b','1',NULL,NULL),
('3','sylvia.zemlak@example.net','2014-04-21','2011-06-24','5d2a19496f55df07f9703ec6230c0a74e70a91b7','1',NULL,NULL),
('4','reginald.ferry@example.com','2013-02-26','1983-07-03','922e2bc6a1ca1dc54c12dab84936c03519c37bdc','0',NULL,NULL),
('5','damion.jaskolski@example.com','1978-05-05','1986-01-17','5676768805bfff4e326c60078977714562a52772','0',NULL,NULL),
('6','owillms@example.com','1973-12-13','2004-08-16','3ba3f152ff0926f40bc03272cec7ec45d8b0751d','1',NULL,NULL),
('7','beatty.reid@example.net','2002-04-08','1994-06-20','c26c3e0e05d1e0cbf68fcf76cc9b98fafb4415ca','1',NULL,NULL),
('8','o\'keefe.vivianne@example.net','2008-12-24','1977-11-14','cbffde769bdcff42035be4f8a9fcb4001714c1e1','1',NULL,NULL),
('9','wuckert.lizzie@example.org','2005-01-15','2016-02-08','38e8d34e3eca6e2f2cee5fb56c3746b45f48857d','0',NULL,NULL),
('10','porter.johns@example.net','2018-03-19','2014-12-21','5838e6862bf132bf0ac923aaf05391c6de3bae2d','1',NULL,NULL),
('11','olson.jillian@example.net','1991-09-21','1978-12-21','e8779320b1c9b1945c9bc34bf9a52d1216e4c262','0',NULL,NULL),
('12','arlene.reinger@example.net','1990-07-28','1985-02-21','51772cf38e1c7ef2e63227997da4d8210ddce83b','0',NULL,NULL),
('13','schumm.tyrique@example.com','2011-02-23','1971-07-24','a452a593915f58c87a44a6fdbd2d3466c87b749b','0',NULL,NULL),
('14','dayna83@example.org','1983-11-10','1985-02-09','68c048ea3915f02b9697ee00af74580a9823927b','1',NULL,NULL),
('15','terrell59@example.net','2002-02-07','1970-03-16','06c80239fcc8c207520e3e16a527528b022d2547','0',NULL,NULL),
('16','awyman@example.com','2013-08-06','1977-05-27','c6759e91cdb95f2da7f7a4615b8094e096b90f75','1',NULL,NULL),
('17','dach.merlin@example.org','2002-07-05','1977-11-21','97a8eee944d4802de7e7a17c3692eefd71f9f80a','1',NULL,NULL),
('18','lionel.lebsack@example.org','2013-02-05','2002-06-11','6594850d263e01145bf72f250cac3585ec1cd4af','1',NULL,NULL),
('19','wmann@example.org','1979-02-15','2020-01-12','eeceb01aa4a183d889ea1c26eebd0cae1c36f616','0',NULL,NULL),
('20','aboehm@example.org','1978-08-25','1978-01-25','ad40196edac1a2f3761b3043bee8efd8ff125e93','1',NULL,NULL),
('21','yadira23@example.net','1995-08-10','1983-11-28','f2e07f13baf22c04a1f8d2a1c068b4bb6ceda4be','0',NULL,NULL),
('22','taurean.strosin@example.org','2016-08-18','2019-12-24','2a6482c439edcd61d851b18113823a1873bd267e','0',NULL,NULL),
('23','uking@example.net','1970-08-24','1989-04-13','88c872b909989c655f52000bbc829af1c9e3aa0f','0',NULL,NULL),
('24','probel@example.org','1986-04-08','1992-08-26','9b958c6ded574dab205a595ded20c619aab582d8','1',NULL,NULL),
('25','schulist.casandra@example.org','1973-01-17','2001-09-28','8ba075bf96b00d035ca6f39f25041caf260924a2','1',NULL,NULL),
('26','dawson58@example.com','1973-03-18','2018-03-04','20d5e2813a7138e37ff6f4c94d32e0e0a32c59b9','0',NULL,NULL),
('27','mohr.aida@example.org','2019-12-07','1981-04-30','92b0fa89da96478bcaa9237fca6de1aad9613494','1',NULL,NULL),
('28','orrin.fisher@example.org','1974-07-20','2019-04-04','564f5f0c9b07f386d3502e584bee90868f832474','0',NULL,NULL),
('29','skiles.stacy@example.net','1988-05-12','1983-07-22','4458f8851cfc5799bc398cbb7962ba91cd5b3979','1',NULL,NULL),
('30','benton.weimann@example.com','1998-09-12','1987-08-18','0f8fa590d6ab3e9d8e798e00d9c304dbc151ffdd','1',NULL,NULL);

INSERT INTO `User_liked_songs` VALUES ('11','16'),
('9','11'),
('23','18'),
('22','2'),
('30','30'),
('9','28'),
('21','27'),
('12','9'),
('5','25'),
('2','2'),
('24','3'),
('27','28'),
('5','29'),
('3','29'),
('25','6'),
('6','9'),
('29','5'),
('14','18'),
('10','13'),
('30','29'),
('1','26'),
('4','26'),
('23','7'),
('25','29'),
('3','23'),
('7','15'),
('5','12'),
('25','1'),
('16','29'),
('21','6'),
('7','15'),
('8','25'),
('11','23'),
('6','1'),
('28','6'),
('7','31'),
('17','20'),
('15','30'),
('23','14'),
('9','31'),
('24','6'),
('4','25'),
('3','19'),
('7','28'),
('28','20'),
('19','19'),
('7','15'),
('2','9'),
('22','5'),
('29','16'),
('7','31'),
('20','13'),
('20','18'),
('16','32'),
('5','31'),
('7','7'),
('29','22'),
('1','4'),
('12','10'),
('11','12'),
('21','18'),
('3','6'),
('12','11'),
('13','26'),
('7','11'),
('17','1'),
('7','24'),
('30','32'),
('26','8'),
('29','13'),
('8','31'),
('16','23'),
('17','30'),
('4','28'),
('17','15'),
('10','13'),
('22','3'),
('10','16'),
('9','24'),
('25','1'),
('20','18'),
('6','6'),
('14','22'),
('30','25'),
('27','7'),
('9','23'),
('8','13'),
('17','28'),
('11','19'),
('27','32'),
('26','25'),
('10','32'),
('16','14'),
('25','14'),
('22','5'),
('22','29'),
('13','27'),
('29','22'),
('28','2'),
('17','28'); 

INSERT INTO `Songs_in_playlist` VALUES ('1','5'),
('2','19'),
('1','7'),
('1','14'),
('3','32'),
('1','4'),
('1','25'),
('3','19'),
('2','9'),
('1','9'),
('1','24'),
('2','25'),
('1','30'),
('1','19'),
('3','9'),
('2','8'),
('2','10'),
('3','17'),
('2','15'),
('3','8'),
('1','24'),
('3','25'),
('3','20'),
('3','28'),
('1','23'),
('2','29'),
('1','27'),
('2','3'),
('1','6'),
('1','32'),
('2','25'),
('1','31'),
('1','13'),
('1','28'),
('3','20'),
('3','32'),
('3','27'),
('1','29'),
('1','19'),
('2','32'),
('1','22'),
('3','24'),
('1','7'),
('2','6'),
('1','29'),
('3','8'),
('1','21'),
('2','15'),
('3','10'),
('1','2'),
('3','24'),
('1','18'),
('3','14'),
('1','1'),
('3','10'),
('3','9'),
('2','7'),
('3','32'),
('3','27'),
('1','16'); 

INSERT INTO `User_playlists` VALUES ('6','1'),
('14','1'),
('10','1'),
('26','2'),
('3','1'),
('1','3'),
('21','1'),
('3','2'),
('27','3'),
('9','1'),
('30','1'),
('26','1'),
('15','1'),
('29','3'),
('23','3'),
('28','3'),
('24','3'),
('8','3'),
('29','2'),
('9','3'),
('30','3'),
('16','3'),
('20','3'),
('24','2'),
('6','3'),
('2','2'),
('8','3'),
('15','1'),
('4','2'),
('6','2'),
('17','2'),
('22','2'),
('17','3'),
('6','3'),
('23','2'),
('4','2'),
('6','2'),
('18','2'),
('22','2'),
('14','1'),
('28','3'),
('13','3'),
('14','2'),
('13','2'),
('12','2'),
('3','1'),
('29','2'),
('13','2'),
('28','1'),
('5','2'),
('25','2'),
('24','3'),
('21','2'),
('16','1'),
('9','3'),
('24','3'),
('20','1'),
('19','3'),
('19','1'),
('1','1'); 
