CREATE TABLE `Songs`(
    `song_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `artist_id` INT UNSIGNED NOT NULL,
    `length` TIME NOT NULL,
    `track_number` INT,
    `lyrics` TEXT,
    `created_at` DATE NOT NULL,
    `uploaded_at` DATE NOT NULL,
    `youtube_link` TEXT,
    `album_id` INT UNSIGNED,
    PRIMARY KEY (`song_id`)
--     FOREIGN KEY(`album_id`) REFERENCES `Album`(`album_id`),
--     FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`)
);

CREATE TABLE `Albums`(
    `album_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `artist_id` INT UNSIGNED NOT NULL,
    `name` TEXT NOT NULL,
    `cover_img` TEXT,
    `created_at` DATE NOT NULL,
    `uploaded_at` DATE NOT NULL,
    PRIMARY KEY (`album_id`)
--     FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`),
--     FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`)
);

CREATE TABLE `Artists`(
    `artist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT,
    `uploaded_at` DATE NOT NULL,
    PRIMARY KEY (`artist_id`)
);

CREATE TABLE `Playlists`(
    `playlist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT,
    `created_at` DATE NOT NULL,
    `uploaded_at` DATE NOT NULL,
    PRIMARY KEY (`playlist_id`)
);

CREATE TABLE `Users`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `uploaded_at` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` TINYINT(1) NOT NULL,
    `preferences` JSON,
    `remember_token` VARCHAR(255),
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `User_playlists`(
    `user_id` INT UNSIGNED NOT NULL,
    `playlist_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY(`playlist_id`) REFERENCES `Playlist`(`playlist_id`),
--     FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`)
);

CREATE TABLE `Songs_in_playlist`(
    `playlist_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY (`song_id`) REFERENCES `Songs`(`song_id`),
--     FOREIGN KEY(`playlist_id`) REFERENCES `Playlist`(`playlist_id`)
);

CREATE TABLE `User_liked_songs`(
    `user_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`),
--     FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`)
);

ALTER TABLE
    `User_liked_songs` ADD CONSTRAINT `user_liked_songs_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `User_liked_songs` ADD CONSTRAINT `user_liked_songs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`);


CREATE TABLE `Songs_in_album`(
    `album_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`)
--     FOREIGN KEY(`album_id`) REFERENCES `Albums`(`album_id`)
);

CREATE TABLE `User_liked_albums`(
    `user_id` INT UNSIGNED NOT NULL,
    `album_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY(`album_id`) REFERENCES `Albums`(`album_id`),
--     FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`)
);

CREATE TABLE `User_liked_artists`(
    `user_id` INT UNSIGNED NOT NULL,
    `artist_id` INT UNSIGNED NOT NULL
--     FOREIGN KEY(`artist_id`) REFERENCES `Artists`(`artist_id`),
--     FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`)
);

ALTER TABLE
    `User_liked_artists` ADD CONSTRAINT `user_liked_artists_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`);
ALTER TABLE
    `User_liked_artists` ADD CONSTRAINT `user_liked_artists_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `artists`(`artist_id`);
ALTER TABLE
    `User_liked_albums` ADD CONSTRAINT `user_liked_albums_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`);
ALTER TABLE
    `User_liked_albums` ADD CONSTRAINT `user_liked_albums_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `albums`(`album_id`);
ALTER TABLE
    `Songs_in_playlist` ADD CONSTRAINT `songs_in_playlist_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `Albums`(`album_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artists`(`artist_id`);
ALTER TABLE
    `Albums` ADD CONSTRAINT `album_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artists`(`artist_id`);
ALTER TABLE
    `Songs_in_playlist` ADD CONSTRAINT `songs_in_playlist_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `Playlists`(`playlist_id`);
ALTER TABLE
    `User_playlists` ADD CONSTRAINT `user_playlists_playlist_id_foreign` FOREIGN KEY(`playlist_id`) REFERENCES `Playlists`(`playlist_id`);
ALTER TABLE
    `User_playlists` ADD CONSTRAINT `user_playlists_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Users`(`user_id`);
ALTER TABLE
    `Songs_in_album` ADD CONSTRAINT `user_Songs_in_album_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `Albums`(`album_id`);
ALTER TABLE
    `Songs_in_album` ADD CONSTRAINT `user_Songs_in_album_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
