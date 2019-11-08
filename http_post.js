import http from "k6/http";
import { check, sleep } from "k6";
var SONG_MAX_COUNT = 10000000; // 10 million
var ALBUM_MAX_COUNT = 1000000; // 1 million
var ARTIST_MAX_COUNT = 1000000; // 1 million
var songId = SONG_MAX_COUNT + 1;

// export let options = {
//   vus: 10,
//   duration: "30s"
// };

var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;;
};

// POST
export default function() {
  var url = 'http://localhost:5001/songs';
  var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
  var song = {
    songId: songId,
    artistId: randomNumber(1, ARTIST_MAX_COUNT),
    albumId: randomNumber(1, ALBUM_MAX_COUNT),
    songName: 'test song name',
    songDataUrl: 'test song url',
    songDuration: randomNumber(100, 300),
    songWaveform: {
        "positiveValues": '[0.17,0.21,0.07,0.16,0.14,0.24,0.04,0.26,0.13,0.42,0.27]'
    },
    tag: tags[randomNumber(0, tags.length - 1)],
    datePosted: '2018-11-08T15:00:00'
  };
  songId++;

  var payload = JSON.stringify(song);
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
};
