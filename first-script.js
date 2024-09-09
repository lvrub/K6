import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
vus: 10,
duration: '10s',
thresholds:{
http_req_duration:['p(95)<30']
},
cloud :{
// projectID: 3713244
}
}

export default function() {
    http.get('https://test.k6.io')
    sleep(1)
}