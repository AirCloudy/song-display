const pool = require('./index.js').pool;

// methods to interact with artists, albums, users tables
function insertArtist(artist) {
  return pool.query('INSERT INTO artists VALUES($1, $2)', artist);
};

function insertAlbum(album) {
  return pool.query('INSERT INTO albums VALUES($1, $2, $3, $4, $5, $6)', album);
};

function insertUser(user) {
  return pool.query('INSERT INTO users VALUES($1, $2)', user);
};

// methods to interact with songs table
function getSong(songId) {
  return pool.query('SELECT * FROM songs WHERE song_id = $1', [songId]);
};

function insertSong(song) {
  return pool.query('INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', song);
};

function updateSong(song) {
  var queryStr = `
  UPDATE songs
  SET
    song_id = $1,
    artist_id = $2,
    album_id = $3,
    song_name = $4,
    song_data_url = $5,
    song_duration = $6,
    song_waveform = $7,
    tag = $8,
    date_posted = $9
  WHERE
    song_id = $1`;
  return pool.query(queryStr, song);
};

function deleteSong(songId) {
  return pool.query('DELETE FROM songs WHERE song_id = $1', [songId]);
};

// methods to interact with song_comments table
function getSongComments(songId) {
  return pool.query('SELECT * FROM song_comments WHERE song_id = $1', [songId]);
};

function insertSongComment(comment) {
  return pool.query('INSERT INTO song_comments VALUES($1, $2, $3, $4, $5, $6)', comment);
};

function updateSongComment(comment) {
  var queryStr = `
  UPDATE song_comments
  SET
    comment_id = $1,
    song_id = $2,
    user_id = $3,
    comment = $4,
    second_in_song = $5,
    date_posted = $6
  WHERE
    comment_id = $1`;
  return pool.query(queryStr, comment);
};

function deleteSongComment(commentId) {
  return pool.query('DELETE FROM song_comments WHERE comment_id = $1', [commentId]);
};

module.exports.insertArtist = insertArtist;
module.exports.insertAlbum = insertAlbum;
module.exports.insertUser = insertUser;
module.exports.getSong = getSong;
module.exports.insertSong = insertSong;
module.exports.updateSong = updateSong;
module.exports.deleteSong = deleteSong;
module.exports.getSongComments = getSongComments;
module.exports.insertSongComment = insertSongComment;
module.exports.updateSongComment = updateSongComment;
module.exports.deleteSongComment = deleteSongComment;
