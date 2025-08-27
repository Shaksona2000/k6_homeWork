import http from 'k6/http';
import { sleep } from 'k6';
import {Counter, Trend} from 'k6/metrics';


export const options = {
    vus : 5,
    duration: '7s',
    thresholds: {   
        http_req_duration: ['p(95)<200'], // 95% of requests must complete below 200ms
    }
}
let myCounter = new Counter ('my_counter');
let newsPageResposeTrend = new Trend('news_page_response_time');
export default function () {
    let res = http.get('https://test.k6.io');
    myCounter.add(2); // Increment the counter by 1
    sleep(2); // sleep for 2 seconds between iterations
    res = http.get('https://test.k6.io/news.php');
   // https://test.k6.io/news.php
   newsPageResposeTrend.add(res.timings.duration);
   sleep(2); 
}