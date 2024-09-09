import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  thresholds: {
    "http_req_duration{page:order}": ["p(95)<1000"],
    http_errors: ["count==0"],
    'http_errors{page:order}': ["count==0"],
    checks: ['rate>=0.99'],
    'checks{page:order}': ['rate>=0.99']

  },
};

let httpErrors = new Counter("http_errors");

export default function () {
  let resp = http.get(
    "https://run.mocky.io/v3/a050b53b-9bc0-47b3-a099-aa9df3ea702f"
  );

  if (resp.error) {
    httpErrors.add(1);
  }

  check(resp, {
    "status is 200": () => resp.status === 200,
  });

  resp = http.get(
    "https://run.mocky.io/v3/da621218-aed4-4527-8116-df42931a6e5f?mocky-delay=2000ms",
    {
      tags: {
        page: "order",
      },
    }
  );

  if (!resp.error) {
    httpErrors.add(1,
      {
        page: "order",
      }
    );
  }

  check(
    resp,
    {
      "status is 201": () => resp.status === 201,
    },
    { page: "order" }
  );
}
