CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_albums`()
BEGIN
SELECT albums.album_id as id, albums.name as name, artists.name as artist, created_at 
FROM music_service.albums 
JOIN artists ON albums.artist_id = artists.artist_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_playlists`()
BEGIN
SELECT playlist_id as id, name, created_at 
FROM music_service.playlists;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_songs`()
BEGIN
SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at 
FROM music_service.songs 
JOIN artists ON songs.artist_id = artists.artist_id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_artists`()
BEGIN
SELECT artist_id as id, name FROM music_service.artists;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_song_byId`(IN id int)
BEGIN
SELECT songs.song_id AS id, songs.title AS name, artists.name as artist, created_at 
FROM music_service.songs 
JOIN artists ON songs.artist_id = artists.artist_id WHERE song_id = id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_albums_byId`(IN id INT)
BEGIN
SELECT albums.album_id as id, albums.name as name, artists.name as artist, created_at 
FROM music_service.albums 
JOIN artists ON albums.artist_id = artists.artist_id 
WHERE album_id = id;
END

CREATE PROCEDURE `get_playlists_byId` (IN id INT)
BEGIN
SELECT playlist_id as id, name, created_at 
FROM music_service.playlists 
WHERE playlist_id = id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_songs`()
BEGIN
SELECT user_liked_songs.song_id AS id, songs.title AS name, COUNT(user_liked_songs.song_id) AS likes
    FROM user_liked_songs
    JOIN songs ON user_liked_songs.song_id=songs.song_id
    GROUP BY id
    ORDER BY likes DESC
    LIMIT 20;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_ablums`()
BEGIN
SELECT albums.album_id AS id, albums.name AS name, COUNT(user_liked_albums.album_id) AS likes
    FROM albums
    JOIN user_liked_albums ON albums.album_id=user_liked_albums.album_id
    GROUP BY id
    ORDER BY likes DESC
    LIMIT 20;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_playlists`()
BEGIN
SELECT playlists.playlist_id AS id, playlists.name AS name, COUNT(user_playlists.playlist_id) AS likes
    FROM user_playlists
    JOIN playlists ON playlists.playlist_id=user_playlists.playlist_id
    GROUP BY id
    ORDER BY likes DESC
    LIMIT 20;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_top_playlists`()
BEGIN
SELECT user_playlists.playlist_id as id,playlists.name as name, COUNT(user_playlists.user_id) AS likes
FROM user_playlists 
JOIN playlists AS playlists
ON playlists.playlist_id=user_playlists.playlist_id
GROUP BY user_playlists.playlist_id 
ORDER BY likes DESC;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_songs_inPlaylist`(IN id INT)
BEGIN
SELECT songs_in_playlist.playlist_id as id, playlists.name AS playlist, songs.title AS name, 
playlists.created_at, artists.name AS artist
FROM songs_in_playlist AS songs_in_playlist
JOIN songs AS songs
ON songs.song_id = songs_in_playlist.song_id
JOIN playlists AS playlists
ON playlists.playlist_id = songs_in_playlist.playlist_id
JOIN artists AS artists
ON songs.artist_id = artists.artist_id
WHERE songs_in_playlist.playlist_id = id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_artist_byId`(IN id INT)
BEGIN
SELECT artists.artist_id as id, artists.name as name 
FROM music_service.artists 
WHERE artist_id = id;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `like_song`(IN user_id int, IN song_id int)
BEGIN
INSERT INTO music_service.user_liked_songs
    VALUES (user_id, song_id);
END