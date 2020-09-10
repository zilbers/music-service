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
    `album_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`song_id`)
);

CREATE TABLE `Album`(
    `album_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `artist_id` INT UNSIGNED NOT NULL,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `song_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY(`album_id`)
);
    
CREATE TABLE `Artist`(
    `artist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `upload_at` DATE NOT NULL,
    PRIMARY KEY(`artist_id`)
);
    
CREATE TABLE `Playlist`(
    `playlist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `cover_img` TEXT NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `user_listening` INT NOT NULL,
    PRIMARY KEY(`playlist_id`)
);

CREATE TABLE `User_name`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `upload_at` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` TINYINT(1) NOT NULL,
    `preferences` JSON NOT NULL,
    `remember_token` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`user_id`)
);
    
CREATE TABLE `User_playlists`(
    `user_id` INT UNSIGNED NOT NULL,
    `playlist_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY(`user_id`, `playlist_id`)
);

CREATE TABLE `Songs_in_playlist`(
    `playlist_id` INT UNSIGNED NOT NULL,
    `song_id` INT UNSIGNED NOT NULL,
	PRIMARY KEY(`song_id`, `playlist_id`)
);

ALTER TABLE
    `Album` ADD CONSTRAINT `album_song_id_foreign` FOREIGN KEY(`song_id`) REFERENCES `Songs`(`song_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `Album`(`album_id`);
ALTER TABLE
    `Songs` ADD CONSTRAINT `songs_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`);
ALTER TABLE
    `Album` ADD CONSTRAINT `album_artist_id_foreign` FOREIGN KEY(`artist_id`) REFERENCES `Artist`(`artist_id`);