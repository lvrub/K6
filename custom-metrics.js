import http from "k6/http";
import { sleep } from "k6";
import {Counter, Trend} from "k6/metrics"


export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<500"],   
    my_counter: ["count>1"],
    responce_time_new_page :["p(95)<270", "p(99)<300"]
  }
};

let  myCounter = new Counter('my_counter');
let newPageResponseTrend = new Trend('responce_time_new_page')

export default function () {
  let res = http.get("https://test.k6.io/");
 myCounter.add(1);
   sleep(2);

   res = http.get('https://test.k6.io/news.php')
newPageResponseTrend.add(res.timings.duration);
sleep(2);

}


