import http from "k6/http";
import { sleep } from "k6";
import {Counter, Trend} from "k6/metrics"


export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<1000"],   
    'http_req_duration{status:200}': ["p(95)<1000"],   
    'http_req_duration{status:201}': ["p(95)<1000"],   
  }
};

export default function () {
  http.get("https://run.mocky.io/v3/a050b53b-9bc0-47b3-a099-aa9df3ea702f");
  http.get("https://run.mocky.io/v3/da621218-aed4-4527-8116-df42931a6e5f?mocky-delay=2000ms");

}


