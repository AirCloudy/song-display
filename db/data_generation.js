const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));
const parser = Promise.promisifyAll(require('csv-parse'));
const faker = require('faker');
const path = require('path');

var exampleDataFilepath = path.resolve('db', 'data', 'example_song_data.csv');

function getExampleData() {
  return fs.readFileAsync(exampleDataFilepath, {encoding: 'utf-8'})
    .then((csv) => {
      var options = {
        columns: true,
        delimiter: ','
      };
      return parser(csv, options);
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
}

function generateData(primaryRecordsCount) {
  // read & parse example data
  return getExampleData()
    .then((data) => {
      var exampleSongs = data;
      var exampleSongIndex = 0;
      var records = [];
      for (let i = 1; i <= primaryRecordsCount; i++) {
        // generate artist and album records
    
        // primary records
        // for each song, generate song record
        exampleSongIndex = (exampleSongIndex === exampleSongs.length - 1) ? 0 : exampleSongIndex + 1; // rotate through elements in example song data array
        var exampleSong = exampleSongs[exampleSongIndex];
        var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
        var record = {
          song_id: i,
          song_name: exampleSong.song_name,
          // artist_id: , // random number betwen x & z
          // album_id: , // random number betwen x & z
          song_data_url: exampleSong.song_data_url,
          song_art_url: exampleSong.song_art_url,
          song_duration: exampleSong.song_duration,
          background_light: exampleSong.background_light,
          background_dark: exampleSong.background_dark,
          waveform_data: exampleSong.waveform_data,
          tag: tags[faker.random.number(tags.length - 1)], // random tag
          date_posted: faker.date.past(3) // random date in the past 3 years
        }
        console.log(record);
        // for each record, callback(tablename, data)
        // return records.push(record);
        // generate user and comment records
      }
      // return records;
      console.log('done!');
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
}

getExampleData()
  .then((data) => {
    console.log('data', data);
    console.log('typeof data', typeof data);
    // for (let i = 0; i < songs.length; i++) {
    //   const intTime = Date.parse(songs[i].date_posted);
    //   // Format waveform JSON data
    //   const formattedWaveform = songs[i].waveform_data
    //     .replace('"{""', '\'{""}')
    //     .replace(']}"', ']}\'');
  });

exports.generateData = generateData;
