const fs = require('fs');
const faker = require('faker');
const path = require('path');
const zlib = require('zlib');
const Readable = require('stream').Readable;

const SONG_MAX_COUNT = 10000000; // 10 million
const ALBUM_MAX_COUNT = ARTIST_MAX_COUNT = 1000000; // 1 million
const USER_MAX_COUNT = 10000; // 10k
const start = Date.now(); // to calculate time taken

function generateArtistData() {
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
    const end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing artists.txt.gz, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      const end = Date.now();
      console.log('Done writing artists.txt.gz, total time taken (ms):', end - start);
    });
}

function generateAlbumData() {
  var stream = fs.createWriteStream(path.resolve('db', 'data', 'albums.txt'));
  for (let i = 1; i <= ALBUM_MAX_COUNT; i++) {
    var record = [];
    record.push(i); // albumId
    record.push(faker.lorem.words(faker.random.number({min: 1, max: 5}))); // albumName
    record.push(faker.date.past(3)); // albumReleaseDate, random date in the past 3 years
    record.push('https://i1.sndcdn.com/artworks-jZ4MhgzsCeD2-0-t500x500.jpg'); // albumArtUrl
    record.push(`(${faker.random.number(255)}, ${faker.random.number(255)}, ${faker.random.number(255)})`); // albumArtColorLight
    record.push(`(${faker.random.number(255)}, ${faker.random.number(255)}, ${faker.random.number(255)})`); // albumArtColorDark
    
    stream.write(record.join('|') + '\n');
    stream.on('error', (err) => {
      console.log('Error:', err.stack);
    });
  }
}

function generateSongData() {
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
    const end = Date.now();
    console.log('Error:', err.stack);
    console.log('Error writing compressed file, total time taken (ms):', end - start);
  });

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      const end = Date.now();
      console.log('Done writing compressed file, total time taken (ms):', end - start);
    });
}

function generateUserData() {
  var stream = fs.createWriteStream(path.resolve('db', 'data', 'users.txt'));
  for (let i = 1; i <= ARTIST_MAX_COUNT; i++) {
    var record = [];
    record.push(i); // userId
    record.push(faker.internet.userName()); // username

    stream.write(record.join('|') + '\n');
    stream.on('error', (err) => {
      console.log('Error:', err.stack);
    });
  }
}

function generateCommentData() {
  var stream = fs.createWriteStream(path.resolve('db', 'data', 'comments.txt'));
  var commentId = 1;
  for (let i = 1; i <= SONG_MAX_COUNT; i++) {
    var songCount = faker.random.number(5) // generate 0 - 5 comments per song
    for (let j = 0; j < songCount; j++) {
      var record = [];
      record.push(commentId++); // commentId
      record.push(i); // songId
      record.push(faker.random.number({min: 1, max: USER_MAX_COUNT})); // userId
      record.push(faker.lorem.words(faker.random.number({min: 1, max: 10}))); // comment
      record.push(faker.random.number(100)); // secondInSong
      record.push(faker.date.past()); // datePosted, random date in the past year

      stream.write(record.join('|') + '\n');
      stream.on('error', (err) => {
        console.log('Error:', err.stack);
      });
    }
  }
}

generateUserData();
generateArtistData();
generateAlbumData();
generateSongData();
generateCommentData();

exports.generateSongData = generateSongData;
exports.generateArtistData = generateArtistData;
exports.generateAlbumData = generateAlbumData;
exports.generateUserData = generateUserData;
exports.generateCommentData = generateCommentData;
