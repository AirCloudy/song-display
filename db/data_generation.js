const fs = require('fs');
const csv = require('csv-parse');
const faker = require('faker');
const path = require('path');

const ARTIST_MAX_COUNT = ALBUM_MAX_COUNT = USER_MAX_COUNT = 20;
const exampleDataFilepath = path.resolve('db', 'data', 'example_song_data.csv');

function generateArtistData() {
  var artists = []
  for (let i = 1; i <= ARTIST_MAX_COUNT; i++) {
    var album = [];
    var record = {
      // artistId: i,
      artistName: faker.lorem.words(faker.random.number({min: 1, max: 5}))
    }
    artists.push(record);
  }
  // save to file;
  return artists;
}

function generateAlbumData() {
  var albums = []
  for (let i = 1; i <= ALBUM_MAX_COUNT; i++) {
    var record = {
      // albumId: i,
      albumName: faker.lorem.words(faker.random.number({min: 1, max: 7})),
      // albumReleaseDate
      // albumArtUrl
    }
    albums.push(record);
  }
  // save to file;
  return albums;
}

function generateSongData(primaryRecordsCount) {
  var exampleSongs = [];
  var songs = [];
  fs.createReadStream(exampleDataFilepath, {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (song) => exampleSongs.push(song))
    .on('end', () => {
      var exampleSongIndex = 0;
      for (let i = 1; i <= primaryRecordsCount; i++) {
        exampleSongIndex = (exampleSongIndex === exampleSongs.length - 1) ? 0 : exampleSongIndex + 1; // rotate through example songs
        var exampleSong = exampleSongs[exampleSongIndex];
        var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
        var record = {
          // songId: i,
          songName: exampleSong[0],
          artistId: faker.random.number({min: 1, max: ARTIST_MAX_COUNT}),
          albumId: faker.random.number({min: 1, max: ALBUM_MAX_COUNT}),
          songDataUrl: exampleSong[1],
          songArtUrl: exampleSong[2],
          songArtColorLight: exampleSong[4],
          songArtColorDark: exampleSong[5],
          songDuration: Number(exampleSong[3]),
          songWaveForm: exampleSong[6],
          tag: tags[faker.random.number(tags.length - 1)], // random tag
          datePosted: faker.date.past(3) // random date in the past 3 years
        }
        songs.push(record);
      }
      // write to file
      return songs;
    });
}

function generateUserData() {
  var users = []
  for (let i = 1; i <= USER_MAX_COUNT; i++) {
    var record = {
      // userId: i,
      username: faker.internet.userName(),
    }
    users.push(record);
  }
  return users;
}

// function generateCommentData() {
  //
// }

exports.generateSongData = generateSongData;
exports.generateArtistData = generateArtistData;
exports.generateAlbumData = generateAlbumData;
exports.generateUserData = generateUserData;
exports.generateCommentData = generateCommentData;
