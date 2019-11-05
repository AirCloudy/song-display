DROP DATABASE IF EXISTS aircloudy;
CREATE DATABASE aircloudy;
\c aircloudy;

CREATE TABLE artists (
  artist_id integer PRIMARY KEY,
  artist_name text NOT NULL
);

CREATE TABLE albums (
  album_id integer PRIMARY KEY,
  album_name text NOT NULL,
  album_release_date date NOT NULL,
  album_art_url text,
  album_art_color_light text,
  album_art_color_dark text
);

CREATE TABLE songs (
  song_id integer PRIMARY KEY,
  artist_id integer NOT NULL REFERENCES artists ON DELETE RESTRICT,
  album_id integer NOT NULL REFERENCES albums ON DELETE RESTRICT,
  song_name text NOT NULL,
  song_data_url text NOT NULL,
  song_duration integer NOT NULL,
  song_waveform json,
  tag text,
  date_posted timestamp with time zone NOT NULL
);

CREATE TABLE users (
  user_id integer PRIMARY KEY,
  username text NOT NULL
);

CREATE TABLE song_comments (
  comment_id integer PRIMARY KEY,
  song_id integer NOT NULL REFERENCES songs ON DELETE CASCADE,
  user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
  comment text NOT NULL,
  second_in_song integer,
  date_posted timestamp with time zone NOT NULL
);

CREATE INDEX song_ids ON song_comments (song_id);
