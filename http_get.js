import http from "k6/http";
import { check, sleep } from "k6";

const SONG_MAX_COUNT = 10000000; // 10 million
// const COMMENT_MAX_COUNT = 70000000; // 70 million

// export let options = {
//   vus: 10,
//   duration: "30s"
// };

// GET
export default function() {
  var songId = Math.floor(Math.random() * SONG_MAX_COUNT) + 1; // pick random song
  http.get(`http://localhost:5001/songs/${songId}`);
  // let res = http.get("http://test.loadimpact.com");
  // check(res, {
  //   "status was 200": (r) => r.status == 200,
  //   "transaction time OK": (r) => r.timings.duration < 200
  // });
};
