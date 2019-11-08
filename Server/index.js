require('newrelic');
const express = require('express');
const app = express();
const port = 5001;
const path = require('path');
const db_methods = require('../db/db_methods.js');
const morgan = require('morgan');

// set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// serve static files
app.use('/:songid', express.static(path.join(__dirname, '../public/')));
// middleware to parse requests with JSON payloads
app.use(express.json());
app.use(morgan('dev'));

// handle API endpoints for songs
app.get('/songs/:songid', (req, res) => {
  db_methods.getSong(req.params.songid)
    .then((data) => res.send(data.rows[0]))
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.post('/songs', (req, res) => {
  var song = [
    req.body.songId,
    req.body.artistId,
    req.body.albumId,
    req.body.songName,
    req.body.songDataUrl,
    req.body.songDuration,
    req.body.songWaveform,
    req.body.tag,
    req.body.datePosted
  ];
  db_methods.insertSong(song)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.put('/songs', (req, res) => {
  var song = [
    req.body.songId,
    req.body.artistId,
    req.body.albumId,
    req.body.songName,
    req.body.songDataUrl,
    req.body.songDuration,
    req.body.songWaveform,
    req.body.tag,
    req.body.datePosted
  ];
  db_methods.updateSong(song)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.delete('/songs/:songid', (req, res) => {
  db_methods.deleteSong(req.params.songid)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

// handle API endpoints for comments
app.get('/comments/song/:songid', (req, res) => {
  db_methods.getSongComments(req.params.songid)
    .then((data) => res.send(data.rows))
    .catch((err) => {
      console.log(err.stack);
      res.end()
    });
});

app.post('/comments', (req, res) => {
  var comment = [
    req.body.commentId,
    req.body.songId,
    req.body.userId,
    req.body.comment,
    req.body.secondInSong,
    req.body.datePosted
  ];
  db_methods.insertSongComment(comment)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.put('/comments', (req, res) => {
  var comment = [
    req.body.commentId,
    req.body.songId,
    req.body.userId,
    req.body.comment,
    req.body.secondInSong,
    req.body.datePosted
  ];
  db_methods.updateSongComment(comment)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.delete('/comments/:commentid', (req, res) => {
  db_methods.deleteSongComment(req.params.commentid)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.listen(port, () => console.log(`Song display server running on port ${port}`));
