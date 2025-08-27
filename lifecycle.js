import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    vus :2,
    duration: '5s',
}
console.log('--init stage--');

export default function (data) {
    console.log('--default function stage--');
   console.log(data);
    sleep(1); // sleep for 1 second between iterations
}

export function setup() {
    console.log('--setup stage--');
    sleep(10);
    const data = {foo: 'bar'};
    return data;
}

export function teardown(){
    console.log('--teardown stage--');
    
}
