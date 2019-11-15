require('newrelic');
const express = require('express');
const app = express();
const port = 5001;
const path = require('path');
const db_methods = require('../db/db_methods.js');
// const morgan = require('morgan');
// set up cache
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient({host: '3.135.51.114'});
redisClient.on('error', (err) => {
  console.log("Error " + err);
});
// set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/loaderio-c840503202988712a21253b077324ba4', function (req, res, next) {
  var options = {root: path.join(__dirname, '../public', 'loaderio')};
  res.sendFile('loaderio-c840503202988712a21253b077324ba4.txt', options, (err) => {
    if (err) console.log('Error:', err);
  });
});

// serve static files
app.use('/:songid', express.static(path.join(__dirname, '../public/')));
// middleware to parse requests with JSON payloads
app.use(express.json());
// app.use(morgan('dev'));

// handle API endpoints for songs
app.get('/songs/:songid', (req, res) => {
  var songId = req.params.songid;
  var responseSent = false;
  redisClient.getAsync(`song:${songId}`)
    .then((cachedSong) => {
      if (cachedSong) {
        // console.log('Song found in cache');
        res.send(JSON.parse(cachedSong));
        responseSent = true;
        throw 'Song found in cache';
      }
      return db_methods.getSong(songId);
    })
    .then((dbData) => {
      // console.log('Song read from db');
      res.send(dbData.rows[0]);
      responseSent = true;
      return redisClient.setAsync(`song:${songId}`, JSON.stringify(dbData.rows[0]));
    })
    // .then(() => {
    //   console.log('Song added to cache');
    // })
    .catch((err) => {
      if (responseSent) return;
      console.log(err);
      res.status(500).end();
    })
});

app.post('/songs', (req, res) => {
  var song = [
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
      res.status(500).end()
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
      res.status(500).end()
    });
});

app.delete('/songs/:songid', (req, res) => {
  db_methods.deleteSong(req.params.songid)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.status(500).end()
    });
});

// handle API endpoints for comments
app.get('/comments/song/:songid', (req, res) => {
  db_methods.getSongComments(req.params.songid)
    .then((data) => res.send(data.rows))
    .catch((err) => {
      console.log(err.stack);
      res.status(500).end()
    });
});

app.post('/comments', (req, res) => {
  var comment = [
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
      res.status(500).end()
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
      res.status(500).end()
    });
});

app.delete('/comments/:commentid', (req, res) => {
  db_methods.deleteSongComment(req.params.commentid)
    .then(() => res.end())
    .catch((err) => {
      console.log(err.stack);
      res.status(500).end()
    });
});

app.listen(port, () => console.log(`Song display server running on port ${port}`));
