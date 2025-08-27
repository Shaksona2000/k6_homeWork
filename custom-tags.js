  import http from 'k6/http';
import { check, }  from 'k6';
import { Counter, Trend } from 'k6/metrics';



export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'], // 95% of requests must complete below 300ms
        'http_req_duration{page: order}': ['p(95)<500'], // 95% of requests to the order page must complete below 500ms
        http_errors : ['count==0'], // No HTTP errors should occur
    },

}
let httpErrors = new Counter('http_errors');

export default function () {
    let res =http.get('https://179cfed71002479a96a6579a5724fb41.api.mockbin.io/');
    if (res.error){
        httpErrors.add(1);
    }
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    res = http.get('https://a3d20b1861794d1ca9df6776c42bbfce.api.mockbin.io/',
        {
            tags:{
                page:'order',
            }
        }
    )
    if (res.error){
        httpErrors.add(1);
    }
    check(res, {
        'status is 201': (r) => r.status === 201,
    });
}