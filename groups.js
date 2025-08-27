import  http from "k6/http";
import { check, sleep , group} from "k6";

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 200ms
        'group_duration{group:::Main page}': ['p(95)<7000'], // 95% of requests to the order page must complete below 500ms
        'group_duration{group:::News page}': ['p(95)<6000'],
    }
    
};

export default function () {

    group('Main page', function () {
         let res = http.get('https://84ac6b841a59497e8d63cbc9971ea169.api.mockbin.io/?mocky-delay=5000ms');
    check(res, {
        'status is 200': (r) => r.status === 200,});
   
    http.get('https://84ac6b841a59497e8d63cbc9971ea169.api.mockbin.io/?mocky-delay=1000ms');

    });
   
    
    group('News page', function () {
            http.get('https://84ac6b841a59497e8d63cbc9971ea169.api.mockbin.io/?mocky-delay=5000ms');


    });

     sleep(1); // sleep for 1 second between iterations
}