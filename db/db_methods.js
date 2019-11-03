const pool = require('./index.js');

// methods to interact with artists table
function insertArtist(artist) {
  return pool
    .query('INSERT INTO artists VALUES($1, $2)', artist)
    .catch(e => console.log('Error inserting artist into db:', e.stack));
};
// methods to interact with albums table
function insertAlbum(album) {
  return pool
    .query('INSERT INTO albums VALUES($1, $2, $3, $4, $5, $6)', album)
    .catch(e => console.log('Error inserting album into db:', e.stack));
};
// methods to interact with users table
function insertUser(user) {
  return pool
    .query('INSERT INTO users VALUES($1, $2)', user)
    .catch(e => console.log('Error inserting user into db:', e.stack));
};

// methods to interact with songs table
function getSong(songId) {
  return pool
    .query('SELECT * FROM songs WHERE song_id = $1', [songId])
    // .then(data => console.log(data.rows[0])) resolve(data.rows[0]))
    .catch(e => console.log('Error getting song from db:', e.stack));
};

function insertSong(song) {
  return pool
    .query('INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', song)
    .catch(e => console.log('Error inserting song into db:', e.stack));
};

function updateSong(song) {
};

function deleteSong(songId) {
};

// methods to interact with song_comments table
function getSongComments(songId) {
  return pool
    .query('SELECT * FROM song_comments WHERE song_id = $1', [songId])
    // .then(data => console.log(data.rows[0])) resolve(data.rows[0]))
    .catch(e => console.log('Error getting song comments from db:', e.stack));
};

function insertSongComment(comment) {
  return pool
    .query('INSERT INTO song_comments VALUES($1, $2, $3, $4, $5, $6)', song)
    .catch(e => console.log('Error inserting song comment into db:', e.stack));
};

function updateSongComment(commentId) {
};

function deleteSongComment(commentId) {
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
