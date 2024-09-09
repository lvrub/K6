import http from "k6/http";
import { sleep } from "k6";

//suddenly  high load for few time
export const options = {
  stages: [
    {
      duration: "10s",
      target: 50,
    },
    {
      duration: "5s",
      target: 0,
    },
    {
      duration: "10s",
      target: 1,
    }
  ],
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  http.get("https://test.k6.io/contacts.php");
  sleep(2);
  http.get("https://test.k6.io/news.php");
  sleep(2);
}
