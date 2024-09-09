import http from "k6/http";
import { sleep } from "k6";

//load to break, never be able to handle
export const options = {
  stages: [
    {
      duration: "1h",
      target: 500000,
    }
  ]
};

export default function () {
  http.get("https://test.k6.io");
  sleep(1);
  http.get("https://test.k6.io/contacts.php");
  sleep(2);
  http.get("https://test.k6.io/news.php");
  sleep(2);
}
