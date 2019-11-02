const fs = require('fs');
const faker = require('faker');
const path = require('path');
const zlib = require('zlib');
const Readable = require('stream').Readable;

const SONG_MAX_COUNT = 3000000; //1000000; // 10 million
const ALBUM_MAX_COUNT = ARTIST_MAX_COUNT = 1000000; // 1 million
const USER_MAX_COUNT = 10000; // 10k

function generateArtistData() {
  var start = Date.now(); // to calculate time taken
  var readStream = new Readable();
  var i = 1;
  readStream._read = () => {
    if (i <= ARTIST_MAX_COUNT) {
      var record = [];
      record.push(i); // artistId
      record.push(faker.lorem.words(faker.random.number({min: 1, max: 5}))); // artistName
      readStream.push(record.join('|') + '\n');
      i++;
    } else {
      readStream.push(null); // close read stream
    }
  };

  var gzip = zlib.createGzip();
  var writeStream = fs.createWriteStream(path.resolve('db', 'data', 'artists.txt.gz'));
  writeStream.on('error', (err) => {
    var end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing artists.txt.gz, total time taken (ms):', end - start);
  });

  readStream
  .pipe(gzip)
  .pipe(writeStream)
  .on('finish', () => {
    var end = Date.now();
    console.log('Done writing artists.txt.gz, total time taken (ms):', end - start);
    this.call();
    });
}

function generateAlbumData() {
  var start = Date.now(); // to calculate time taken
  var readStream = new Readable();
  var i = 1;
  readStream._read = () => {
    if (i <= ALBUM_MAX_COUNT) {
      var record = [];
      record.push(i); // albumId
      record.push(faker.lorem.words(faker.random.number({min: 1, max: 5}))); // albumName
      record.push(faker.date.past(3)); // albumReleaseDate, random date in the past 3 years
      record.push('https://i1.sndcdn.com/artworks-jZ4MhgzsCeD2-0-t500x500.jpg'); // albumArtUrl
      record.push(`(${faker.random.number(255)}, ${faker.random.number(255)}, ${faker.random.number(255)})`); // albumArtColorLight
      record.push(`(${faker.random.number(255)}, ${faker.random.number(255)}, ${faker.random.number(255)})`); // albumArtColorDark  
      readStream.push(record.join('|') + '\n');
      i++;
    } else {
      readStream.push(null); // close read stream
    }
  };

  var gzip = zlib.createGzip();
  var writeStream = fs.createWriteStream(path.resolve('db', 'data', 'albums.txt.gz'));
  writeStream.on('error', (err) => {
    var end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing albums.txt.gz, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      var end = Date.now();
      console.log('Done writing albums.txt.gz, total time taken (ms):', end - start);
      this.call();
    });
}

function generateUserData() {
  var start = Date.now(); // to calculate time taken
  var readStream = new Readable();
  var i = 1;
  readStream._read = () => {
    if (i <= USER_MAX_COUNT) {
      var record = [];
      record.push(i); // userId
      record.push(faker.internet.userName()); // username
      readStream.push(record.join('|') + '\n');
      i++;
    } else {
      readStream.push(null); // close read stream
    }
  };

  var gzip = zlib.createGzip();
  var writeStream = fs.createWriteStream(path.resolve('db', 'data', 'users.txt.gz'));
  writeStream.on('error', (err) => {
    var end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing users.txt.gz, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      var end = Date.now();
      console.log('Done writing users.txt.gz, total time taken (ms):', end - start);
      this.call();
    });
}

function generateSongData() {
  var start = Date.now(); // to calculate time taken
  var readStream = new Readable();
  var i = 1;
  var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
  readStream._read = () => {
    if (i <= SONG_MAX_COUNT) {
      var record = [];
      record.push(i); // songId
      record.push(faker.random.number({min: 1, max: ARTIST_MAX_COUNT})); // artistId
      record.push(faker.random.number({min: 1, max: ALBUM_MAX_COUNT})); // albumId
      record.push(faker.lorem.words(faker.random.number({min: 1, max: 5}))); // songName
      record.push('https://aircloudy-songs.s3.us-east-2.amazonaws.com/01+Carry+On+Wayward+Son.m4a'); // songDataUrl
      record.push(faker.random.number({min: 100, max: 300})); // songDuration
      record.push('{"positiveValues":"[0.17,0.21,0.07,0.16,0.14,0.24,0.04,0.26,0.13,0.42,0.27]"}'); // songWaveform
      record.push(tags[faker.random.number(tags.length - 1)]); // tag
      record.push(faker.date.past()); // datePosted
      readStream.push(record.join('|') + '\n');
      i++;
    } else {
      readStream.push(null); // close read stream
    }
  };

  var gzip = zlib.createGzip();
  var writeStream = fs.createWriteStream(path.resolve('db', 'data', 'songs.txt.gz'));
  writeStream.on('error', (err) => {
    var end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing songs.txt.gz, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      var end = Date.now();
      console.log('Done writing songs.txt.gz, total time taken (ms):', end - start);
      this.call();
    });
}

function generateCommentData() {
  var start = Date.now(); // to calculate time taken
  var readStream = new Readable();
  var i = 1;
  var commentId = 1;
  readStream._read = () => {
    if (i <= SONG_MAX_COUNT) {
      var commentCount = faker.random.number({min: 15, max: 50}) // generate 15-50 comments per song
      var records = [];
      for (let j = 0; j < commentCount; j++) {
        var record = [];
        record.push(commentId++); // commentId
        record.push(i); // songId
        record.push(faker.random.number({min: 1, max: USER_MAX_COUNT})); // userId
        record.push(faker.lorem.words(faker.random.number({min: 1, max: 10}))); // comment
        record.push(faker.random.number(300)); // secondInSong
        record.push(faker.date.past()); // datePosted, random date in the past year
        records.push(record.join('|'));
      }
      if (records.length) readStream.push(records.join('\n') + '\n');
      i++;
    } else {
      readStream.push(null); // close read stream
    }
  };

  var gzip = zlib.createGzip();
  var writeStream = fs.createWriteStream(path.resolve('db', 'data', 'comments.txt.gz'));
  writeStream.on('error', (err) => {
    var end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing comments.txt.gz, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      var end = Date.now();
      console.log('Done writing comments.txt.gz, total time taken (ms):', end - start);
      this.call();
    });
}

function generateData() {
  var commentData = generateCommentData.bind(() => console.log('Done generating data.'));
  var songData = generateSongData.bind(commentData);
  var userData = generateUserData.bind(songData);
  var albumData = generateAlbumData.bind(userData);
  var artistData = generateArtistData.bind(albumData);
  artistData();
}

// // write data in order: artists, albums, users, songs, comments
generateData();
