import http from 'k6/http';
import { check } from 'k6'; 
import { sleep } from 'k6';
import exec from 'k6/execution';
export const options = {
   vus : 10,
   duration: '7s',
   thresholds: {
      http_req_duration: ['p(95)<200'],
       http_req_duration: ['max<2000'], // 95% of requests must complete below 500ms
       http_req_failed: ['rate<0.01'], // less than 1% of requests should fail
       http_reqs: ['count >= 60'], // at least 80 requests should be made
       checks: ['rate >= 0.98'], // at least 98% of checks should pass
       // http_reqs: ['rate > 8'],
   },
}

export default function () {
   const res =  http.get('https://test.k6.io');
   console.log(exec)
   check(res,{
    'status is 200':(r)=> r.status === 200,
    'page is startPage':(r)=> r.body.includes('QuickPizza')
   });
  
   sleep(2); // sleep for 2 second between iterations

   
}