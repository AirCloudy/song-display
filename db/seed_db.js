const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
var copyFrom = require('pg-copy-streams').from;
const pool = require('./index.js').pool;

function seedData(table) {
  var startTime = Date.now(); // to calculate time taken
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      console.log('Total time taken (ms):', Date.now() - startTime);
      return;
    }
    var readStream = fs.createReadStream(path.resolve('db', 'data', `${table}.txt.gz`));
    readStream.on('error', (err) => {
      console.log(`Error reading data from ${table} file`, err.stack);
      console.log('Total time taken (ms):', Date.now() - startTime);
      release();
    });
    var unzip = zlib.createGunzip();
    var dbStream = client.query(copyFrom(`COPY ${table} FROM STDIN USING DELIMITERS '|'`));
    dbStream.on('error', (err) => {
      console.log(`Error inserting ${table} data into db`, err.stack);
      console.log('Total time taken (ms):', Date.now() - startTime);
      release();
    });
    dbStream.on('end', () => {
      console.log(`Finished adding ${table} data from file to db`);
      console.log('Total time taken (ms):', Date.now() - startTime);
      release();
    });

    readStream
      .pipe(unzip)
      .pipe(dbStream);
  });
}

seedData('artists');
// seedData('albums');
// seedData('users');
// seedData('songs');
// seedData('song_comments');
