import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
    stages: [
        { duration: '5m', 
            target: 1000
         }, 
         { duration: '24h', 
            target: 1000
         },
         { duration: '5m', 
            target: 0
         }  // Ramp up to 100
    ]
    
    
   
}

export default function () {
 const resp = http.get('https://test.k6.io');
 sleep(1);
 


 //console.log(resp.status)
}