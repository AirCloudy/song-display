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
