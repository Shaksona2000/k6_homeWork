import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
    stages: [
        { duration: '10s', 
            target: 10
         }, 
         { duration: '30s', 
            target: 20
         },
         { duration: '10s', 
            target: 0
         }  // Ramp up to 100
    ]
    
    
   
}

export default function () {
 const resp = http.get('https://test.k6.io');
 sleep(1);
 http.get('https://test.k6.io/contacts.php'); 
 sleep(2);
http.get('https://test.k6.io/news.php');
sleep(2);


 //console.log(resp.status)
}