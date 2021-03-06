import http from "k6/http";
var ALBUM_MAX_COUNT = 1000000; // 1 million
var ARTIST_MAX_COUNT = 1000000; // 1 million

export let options = {
  vus: 200,
  // rps: 1200,
  duration: "30s"
};

var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function() {
  var url = 'http://localhost:5001/songs';
  var tags = ['# Electronic', '# Rock', '# Alternative', '# Rap', '# Classical', '# Country', '# Jazz', '# Pop', '# Punk'];
  var song = {
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

  var payload = JSON.stringify(song);
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
};
