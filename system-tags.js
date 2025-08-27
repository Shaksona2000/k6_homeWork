import http from 'k6/http';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests must complete below 200ms
    },
}

export default function () {
    htt

}
