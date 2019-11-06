DROP DATABASE IF EXISTS aircloudy;
CREATE DATABASE aircloudy;
\c aircloudy;

CREATE TABLE artists (
  artist_id integer NOT NULL,
  artist_name text NOT NULL
);

CREATE TABLE albums (
  album_id integer NOT NULL,
  album_name text NOT NULL,
  album_release_date date NOT NULL,
  album_art_url text,
  album_art_color_light text,
  album_art_color_dark text
);

CREATE TABLE songs (
  song_id integer NOT NULL,
  artist_id integer NOT NULL,
  album_id integer NOT NULL,
  song_name text NOT NULL,
  song_data_url text NOT NULL,
  song_duration integer NOT NULL,
  song_waveform json,
  tag text,
  date_posted timestamp with time zone NOT NULL
);

CREATE TABLE users (
  user_id integer NOT NULL,
  username text NOT NULL
);

CREATE TABLE song_comments (
  comment_id integer NOT NULL,
  song_id integer NOT NULL,
  user_id integer NOT NULL,
  comment text NOT NULL,
  second_in_song integer,
  date_posted timestamp with time zone NOT NULL
);

-- after seeding db
ALTER TABLE artists ADD PRIMARY KEY (artist_id);
ALTER TABLE albums ADD PRIMARY KEY (album_id);
ALTER TABLE songs ADD PRIMARY KEY (song_id);
ALTER TABLE users ADD PRIMARY KEY (user_id);
ALTER TABLE song_comments ADD PRIMARY KEY (comment_id);

ALTER TABLE songs ADD FOREIGN KEY (artist_id) REFERENCES artists ON DELETE RESTRICT;
ALTER TABLE songs ADD FOREIGN KEY (album_id) REFERENCES albums ON DELETE RESTRICT;
ALTER TABLE song_comments ADD FOREIGN KEY (song_id) REFERENCES songs ON DELETE CASCADE;
ALTER TABLE song_comments ADD FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE;

CREATE INDEX song_ids ON song_comments (song_id);
