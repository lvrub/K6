import http from "k6/http";
import { group, sleep, check } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<2500"],
    'http_req_duration{expected_response:true}': ["p(95)<2500"],
    'group_duration{group:::Main page}':["p(95)<9000"],
    'group_duration{group:::New page}':["p(95)<6000"],
    'group_duration{group:::Main page::Assets}':["p(95)<3000"]


  },
};

export default function () {

  group("Main page", ()=> {
    let res = http.get("https://run.mocky.io/v3/fcdde6fe-6cce-4cc3-b99e-dec21db5e05b?mocky-delay=900ms");
    check(res, { "status is 200": () => res.status === 200, });

    group('Assets', ()=>{
      http.get("https://run.mocky.io/v3/fcdde6fe-6cce-4cc3-b99e-dec21db5e05b?mocky-delay=900ms");
      http.get("https://run.mocky.io/v3/fcdde6fe-6cce-4cc3-b99e-dec21db5e05b?mocky-delay=900ms");
    })

  });

  group("New page", ()=> {
    http.get("https://run.mocky.io/v3/435c6a6e-2dba-4810-a631-fb99e75b5323");
  });

  sleep(1);
}
