const express = require('express');
const app = express();
const port = 5001;
const path = require('path');
const db_methods = require('../db/db_methods.js');

// set CORS headers and serve static files
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use('/:song_id', express.static(path.join(__dirname, '../public/')));

// handle API endpoints
app.get('/songs/:song_id', (req, res) => {
  var song_id = req.params.song_id;
  db_methods.getSong(song_id)
    .then((data) => {
      // console.log('songs', data.rows[0]);
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err.stack);
      res.end();
    });
});

app.post('/songs', (req, res) => {});
app.put('/songs/:songid', (req, res) => {});
app.delete('/songs/:songid', (req, res) => {});
app.get('/comments', (req, res) => {});
app.post('/comments', (req, res) => {});
app.put('/comments/:commentid', (req, res) => {});
app.delete('/comments/:commentid', (req, res) => {});

app.listen(port, () => console.log(`Song display server running on port ${port}`));
