const express = require('express');
const app = express();
const port = 5001;
const path = require('path');
const db_methods = require('../db/db_methods.js');

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
app.use(express.json())

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

app.put('/songs/:songid', (req, res) => {});

app.delete('/songs/:songid', (req, res) => {
  db_methods.deleteSong(req.params.songid)
    .then((success) => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

// handle API endpoints for comments
app.get('/comments', (req, res) => {});
app.post('/comments', (req, res) => {});
app.put('/comments/:commentid', (req, res) => {});
app.delete('/comments/:commentid', (req, res) => {});

app.listen(port, () => console.log(`Song display server running on port ${port}`));
