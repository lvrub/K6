import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let resp =  http.get("https://test-api.k6.io/public/crocodiles/");

  console.log(resp.headers['Content-Type']);

  const crocodiles = resp.json()
  const crocodileId = crocodiles[0].id;
  const crocodileName = crocodiles[0].name;

  resp = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

  check(resp, {
    'status is 200' : () => resp.status ===200,
    'crocodile name': ()=> resp.json().name === crocodileName
  })

  }
  