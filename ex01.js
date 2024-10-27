import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';
import { numeroAleatorioAte } from './utils/numeros.js';

console.log('EX01.js is RUNNING')
export const options = {
  stages: [    
    {target: 5, duration: '5s'},
    {target: 5, duration: '6s'},
    {target: 0, duration: '3s'},
  ]
};

export default function() {
  http.get('https://test.k6.io');
  userThinkerTime(numeroAleatorioAte(5));
}
