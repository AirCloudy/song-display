import http from "k6/http";
const SONG_MAX_COUNT = 10000000; // 10 million

export let options = {
  vus: 200,
  duration: "1m"
};

function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min; // random in range
  var mix = Math.random() * influence; // random mixer
  return Math.round(rnd * (1 - mix) + bias * mix); // mix full range and bias
}

export default function() {
  var songId = getRndBias(1, SONG_MAX_COUNT, SONG_MAX_COUNT * 0.8, 0.95);
  http.get(`http://localhost:5001/songs/${songId}`);
};

// import { sleep } from "k6";
// import http from "k6/http";
// const SONG_MAX_COUNT = 10000000; // 10 million

// var desiredRPS = 950;
// var RPSperVU = 4;
// var VUsRequired = Math.round(desiredRPS / RPSperVU);

// export let options = {
//   vus: VUsRequired,
//   duration: '15s',
// };

// export default function() {
//   var iterationStart = new Date().getTime(); // timestamp in ms
//   var songId = Math.floor(Math.random() * SONG_MAX_COUNT) + 1; // pick random song

//   for (let i of Array(RPSperVU).keys()) {
//     http.get(`http://localhost:5001/songs/${songId}`);
//   }

//   var iterationDuration = (new Date().getTime() - iterationStart) / 1000;
//   var sleepTime = 1 - iterationDuration;
//   if (sleepTime > 0) {
//     sleep(sleepTime);
//   }
// }
