CREATE KEYSPACE aircloudy;
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};
USE aircloudy;

CREATE TABLE songs (
  song_id int,
  artist_name text,
  album_name text,
  album_release_date timestamp,
  album_art_url text,
  album_art_color_light text,
  album_art_color_dark text,
  song_name text,
  song_data_url text,
  song_duration int,
  song_waveform text,
  tag text,
  date_posted timestamp,
  PRIMARY KEY (song_id)
);

CREATE TABLE song_comments (
  comment_id int,
  song_id int,
  username text,
  comment text,
  second_in_song int,
  date_posted timestamp,
  PRIMARY KEY (song_id, comment_id)
);

-- to seed db
COPY aircloudy.songs(song_id, artist_name, album_name, album_release_date, album_art_url, album_art_color_light, album_art_color_dark, song_name, song_data_url, song_duration, song_waveform, tag, date_posted) FROM '/Users/angeliquenehmzow/Dropbox/Personal/Education/Other/Coding Bootcamps 2019/HackReactor/Code/sdc-aircloudy/song-display/db/data/songs_wide.txt' WITH DELIMITER='|';
COPY aircloudy.song_comments(comment_id, song_id, username, comment, second_in_song, date_posted) FROM '/Users/angeliquenehmzow/Dropbox/Personal/Education/Other/Coding Bootcamps 2019/HackReactor/Code/sdc-aircloudy/song-display/db/data/song_comments_wide.txt' WITH DELIMITER='|';
