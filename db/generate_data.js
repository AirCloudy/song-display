const fs = require('fs');
const csv = require('csv-parse');
const faker = require('faker');
const path = require('path');

const SONG_MAX_COUNT = 10000000; // 10 million
const ALBUM_MAX_COUNT = ARTIST_MAX_COUNT = 1000000; // 1 million
const USER_MAX_COUNT = 10000; // 10k
const exampleSongsPath = path.resolve('db', 'data', 'example_song_data.csv');
const exampleAlbumsPath = path.resolve('db', 'data', 'example_album_data.csv');

function generateArtistData() {
  var stream = fs.createWriteStream(path.resolve('db', 'data', 'artists.txt'));
  for (let i = 1; i <= ARTIST_MAX_COUNT; i++) {
    var record = [];
    record.push(i); // artistId
    record.push(faker.lorem.words(faker.random.number({min: 1, max: 5}))); // artistName

    stream.write(record.join('|') + '\n');
  }
}

function generateAlbumData() {
  var exampleAlbums = [];
  fs.createReadStream(exampleAlbumsPath, {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (album) => exampleAlbums.push(album))
    .on('end', () => {
      var exampleAlbumIndex = 0;
      var stream = fs.createWriteStream(path.resolve('db', 'data', 'albums.txt'));
      for (let i = 1; i <= ALBUM_MAX_COUNT; i++) {
        exampleAlbumIndex = (exampleAlbumIndex === exampleAlbums.length - 1) ? 0 : exampleAlbumIndex + 1; // rotate through example albums
        var exampleSong = exampleAlbums[exampleAlbumIndex];
        var record = [];
        record.push(i); // albumId
        record.push(exampleSong[0]); // albumName
        record.push(faker.date.past(3)); // albumReleaseDate, random date in the past 3 years
        record.push(exampleSong[1]); // albumArtUrl
        record.push(exampleSong[2]); // albumArtColorLight
        record.push(exampleSong[3]); // albumArtColorDark
        stream.write(record.join('|') + '\n');
      }
    });
}

function generateSongData() {
  var exampleSongs = [];
  fs.createReadStream(exampleSongsPath, {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (song) => exampleSongs.push(song))
    .on('end', () => {
      var exampleSongIndex = 0;
      var stream = fs.createWriteStream(path.resolve('db', 'data', 'songs.txt'));
      for (let i = 1; i <= SONG_MAX_COUNT; i++) {
        exampleSongIndex = (exampleSongIndex === exampleSongs.length - 1) ? 0 : exampleSongIndex + 1; // rotate through example songs
        var exampleSong = exampleSongs[exampleSongIndex];
        var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
        
        var record = [];
        record.push(i); // songId
        record.push(faker.random.number({min: 1, max: ARTIST_MAX_COUNT})); // artistId
        record.push(faker.random.number({min: 1, max: ALBUM_MAX_COUNT})); // albumId
        record.push(exampleSong[0]); // songName
        record.push(exampleSong[1]); // songDataUrl
        record.push(exampleSong[2]); // songDuration
        record.push(exampleSong[3]); // songWaveform
        record.push(tags[faker.random.number(tags.length - 1)]); // tag
        record.push(faker.date.past()); // datePosted

        stream.write(record.join('|') + '\n');
      }
    });
}

function generateUserData() {
  var stream = fs.createWriteStream(path.resolve('db', 'data', 'users.txt'));
  for (let i = 1; i <= ARTIST_MAX_COUNT; i++) {
    var record = [];
    record.push(i); // userId
    record.push(faker.internet.userName()); // username

    stream.write(record.join('|') + '\n');
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
      record.push(faker.random.number(135)); // secondInSong, random second less than min example song duration
      record.push(faker.date.past()); // datePosted, random date in the past year

      stream.write(record.join('|') + '\n');
    }
  }
}

generateSongData();
generateArtistData();
generateAlbumData();
generateUserData();
generateCommentData();

exports.generateSongData = generateSongData;
exports.generateArtistData = generateArtistData;
exports.generateAlbumData = generateAlbumData;
exports.generateUserData = generateUserData;
exports.generateCommentData = generateCommentData;
