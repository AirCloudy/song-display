import http from "k6/http";
import { check, sleep } from "k6";
const SONG_MAX_COUNT = 10000000; // 10 million

export let options = {
  vus: 240,
  duration: "45s"
};

export default function() {
  var songId = Math.floor(Math.random() * SONG_MAX_COUNT) + 1; // pick random song
  http.get(`http://localhost:5001/songs/${songId}`);
};

// import { check, sleep } from "k6";
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
