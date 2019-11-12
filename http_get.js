import http from "k6/http";
const SONG_MAX_COUNT = 10000000; // 10 million

export let options = {
  vus: 200,
  rps: 1200,
  duration: "5m"
};

function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min; // random in range
  var mix = Math.random() * influence; // random mixer
  return Math.round(rnd * (1 - mix) + bias * mix); // mix full range and bias
}

export default function() {
  // var songId = getRndBias(1, SONG_MAX_COUNT, SONG_MAX_COUNT * 0.8, 0.95);
  var songId = Math.floor(Math.random() * (SONG_MAX_COUNT - (9999000) + 1)) + 9999000;
  http.get(`http://localhost:5001/songs/${songId}`);
};
