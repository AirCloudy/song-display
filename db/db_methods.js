const pool = require('./index.js').pool;

// // methods to interact with artists table
// function insertArtist(artist) {
//   return pool.query('INSERT INTO artists VALUES($1, $2)', artist);
// };
// // methods to interact with albums table
// function insertAlbum(album) {
//   return pool.query('INSERT INTO albums VALUES($1, $2, $3, $4, $5, $6)', album);
// };
// // methods to interact with users table
// function insertUser(user) {
//   return pool.query('INSERT INTO users VALUES($1, $2)', user);
// };

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

// // methods to interact with song_comments table
// function getSongComments(songId) {
//   return pool.query('SELECT * FROM song_comments WHERE song_id = $1', [songId]);
// };

// function insertSongComment(comment) {
//   return pool.query('INSERT INTO song_comments VALUES($1, $2, $3, $4, $5, $6)', song);
// };

// function updateSongComment(commentId) {
// };

// function deleteSongComment(commentId) {
// };

// module.exports.insertArtist = insertArtist;
// module.exports.insertAlbum = insertAlbum;
// module.exports.insertUser = insertUser;
module.exports.getSong = getSong;
module.exports.insertSong = insertSong;
module.exports.updateSong = updateSong;
module.exports.deleteSong = deleteSong;
// module.exports.getSongComments = getSongComments;
// module.exports.insertSongComment = insertSongComment;
// module.exports.updateSongComment = updateSongComment;
// module.exports.deleteSongComment = deleteSongComment;
