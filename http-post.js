import { check, sleep } from "k6";
import http from "k6/http";

export default function () {
  const credentials = {
    username: "test_" + Date.now(),
    password: "secrets" + Date.now(),
  };

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  http.post(
    "https://test-api.k6.io/user/register/",
    JSON.stringify(credentials),
    params
  );

  let res = http.post(
    "https://test-api.k6.io/auth/token/login/",
    JSON.stringify(credentials),
    params
  );

  let accessToken = res.json().access;

  http.get("https://test-api.k6.io/my/crocodiles/", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  let crocodile = http.post(
    "https://test-api.k6.io/my/crocodiles/",

    JSON.stringify({
      name: "Tutu2",
      sex: "M",
      date_of_birth: "2020-02-03",
    }),
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  const id = crocodile.json().id;
  console.log(id);

  let croc = http.get(`https://test-api.k6.io/my/crocodiles/${id}/`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  check(croc, {
    'status is 200' : () => croc.status ===200,
    'check croc id': () => croc.json().id === id
  });

  res = http.put(`https://test-api.k6.io/my/crocodiles/${id}/`,
        JSON.stringify(
        {
            name: 'Updated Random croc',
            sex: 'F',
            date_of_birth: '1900-10-28'
        }
    ),
    {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    }
);  

res = http.patch(`https://test-api.k6.io/my/crocodiles/${id}/`,
  JSON.stringify(
  {
      sex: 'M',
  }
),
{
  headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
  }
}
);  


http.del(`https://test-api.k6.io/my/crocodiles/${id}/`,
  null,
{
  headers: {
      Authorization: 'Bearer ' + accessToken,
  }
}
);  


}
