CREATE TABLE `Songs`(
    `song_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `artist_id` INT UNSIGNED NOT NULL,
    `length` TIME NOT NULL,
    `track_number` INT NOT NULL,
    `lyrics` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `youtube_link` TEXT NOT NULL,
    `album_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `Songs` ADD PRIMARY KEY `songs_song_id_primary`(`song_id`);
CREATE TABLE `Album`(
    `album_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `artist_id` INT UNSIGNED NOT NULL,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `song_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `Album` ADD PRIMARY KEY `album_album_id_primary`(`album_id`);
ALTER TABLE
    `Album` ADD UNIQUE `album_name_unique`(`name`);
CREATE TABLE `Artist`(
    `artist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `upload_at` DATE NOT NULL
);
ALTER TABLE
    `Artist` ADD PRIMARY KEY `artist_artist_id_primary`(`artist_id`);
ALTER TABLE
    `Artist` ADD UNIQUE `artist_name_unique`(`name`);
CREATE TABLE `Playlist`(
    `playlist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `user_listening` INT NOT NULL
);
ALTER TABLE
    `Playlist` ADD PRIMARY KEY `playlist_playlist_id_primary`(`playlist_id`);
CREATE TABLE `User_name`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` TINYINT(1) NOT NULL,
    `preferences` JSON NOT NULL,
    `remember_token` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `User_name` ADD PRIMARY KEY `user_name_user_id_primary`(`user_id`);
ALTER TABLE
    `User_name` ADD UNIQUE `user_name_email_unique`(`email`);
CREATE TABLE `User_playlists`(
    `user_id` INT UNSIGNED NOT NULL,
    `playlist_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `Songs_in_playlist`(
    `playlist_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL
);
CREATE TABLE `User_liked_songs`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `song_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `Songs_in_playlist` ADD CONSTRAINT `songs_in_playlist_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `Album` ADD CONSTRAINT `album_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `User_liked_songs` ADD CONSTRAINT `user_liked_songs_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `Album`(`album_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`);
ALTER TABLE
    `Album` ADD CONSTRAINT `album_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`);
ALTER TABLE
    `Songs_in_playlist` ADD CONSTRAINT `songs_in_playlist_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `Playlist`(`playlist_id`);
ALTER TABLE
    `User_playlists` ADD CONSTRAINT `user_playlists_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `Playlist`(`playlist_id`);
ALTER TABLE
    `User_playlists` ADD CONSTRAINT `user_playlists_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User_name`(`user_id`);
ALTER TABLE
    `User_liked_songs` ADD CONSTRAINT `user_liked_songs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User_name`(`user_id`);