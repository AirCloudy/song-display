const fs = require('fs');
const csv = require('csv-parse');
const faker = require('faker');
const path = require('path');

const SONG_MAX_COUNT = 20;
const ARTIST_MAX_COUNT = ALBUM_MAX_COUNT = USER_MAX_COUNT = 5;
const exampleDataFilepath = path.resolve('db', 'data', 'example_song_data.csv');

function generateArtistData() {
  var artists = []
  for (let i = 1; i <= ARTIST_MAX_COUNT; i++) {
    var record = {
      // artistId: i,
      artistName: faker.lorem.words(faker.random.number({min: 1, max: 5}))
    }
    artists.push(record);
  }
  // write to file
  return artists;
}

function generateAlbumData() {
  var albums = []
  for (let i = 1; i <= ALBUM_MAX_COUNT; i++) {
    var record = {
      // albumId: i,
      albumName: faker.lorem.words(faker.random.number({min: 1, max: 7})),
      albumReleaseDate: faker.date.past(3), // random date in the past 3 years
      albumArtUrl: 'https://i1.sndcdn.com/artworks-d9701706-6d90-4dab-8639-33d432e2dab7-0-t500x500.jpg'
    }
    albums.push(record);
  }
  // write to file
  return albums;
}

function generateSongData() {
  var exampleSongs = [];
  var songs = [];
  fs.createReadStream(exampleDataFilepath, {encoding: 'utf-8'})
    .pipe(csv())
    .on('data', (song) => exampleSongs.push(song))
    .on('end', () => {
      var exampleSongIndex = 0;
      for (let i = 1; i <= SONG_MAX_COUNT; i++) {
        exampleSongIndex = (exampleSongIndex === exampleSongs.length - 1) ? 0 : exampleSongIndex + 1; // rotate through example songs
        var exampleSong = exampleSongs[exampleSongIndex];
        var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
        var record = {
          // songId: i,
          artistId: faker.random.number({min: 1, max: ARTIST_MAX_COUNT}),
          albumId: faker.random.number({min: 1, max: ALBUM_MAX_COUNT}),
          songName: exampleSong[0],
          songDataUrl: exampleSong[1],
          songArtUrl: exampleSong[2],
          songArtColorLight: exampleSong[3],
          songArtColorDark: exampleSong[4],
          songDuration: Number(exampleSong[5]),
          songWaveform: exampleSong[6],
          tag: tags[faker.random.number(tags.length - 1)], // random tag
          datePosted: faker.date.past() // random date in the past year
        }
        songs.push(record);
      }
      // write to file
      console.log(songs);
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
  // write to file
  return users;
}

function generateCommentData() {
  var comments = [];
  for (let i = 1; i <= SONG_MAX_COUNT; i++) {
    var songCount = faker.random.number(5) // generate 0 - 5 comments per song
    for (let j = 0; j < songCount; j++) {
      var record = {
        // commentId: i + j,
        songId: i,
        userId: faker.random.number({min: 1, max: USER_MAX_COUNT}),
        commentId: faker.lorem.words(faker.random.number({min: 1, max: 10})),
        secondInSong: faker.random.number(135), // random second less than min example song duration
        datePosted: faker.date.past() // random date in the past year
      }
      comments.push(record);
    }
  }
  // write to file
  return comments;
}

console.log(generateSongData());
console.log(generateArtistData());
console.log(generateAlbumData());
console.log(generateUserData());
console.log(generateCommentData());

exports.generateSongData = generateSongData;
exports.generateArtistData = generateArtistData;
exports.generateAlbumData = generateAlbumData;
exports.generateUserData = generateUserData;
exports.generateCommentData = generateCommentData;
