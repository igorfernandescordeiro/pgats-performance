import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';


export const options = {
    scenarios: {
       
    }
};

export default function() {
   
    userThinkerTime(1);
};
