import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';
import { numeroAleatorioAte } from './utils/numeros.js';

export const options = {
  // vus: 10,
  // duration: '10s',
  thresholds: {
    http_req_waiting: ['p(90) >= 10', 'p(90) <= 50', 'avg < 60']
  },
  cloud: {
    name: 'Exercicio 01',
    projectID: 3715830
  },
  stages: [    
    {target: 20, duration: '5s'},
    {target: 20, duration: '20s'},
    {target: 0, duration: '5s'},
  ]
};

export default function() {
  http.get('https://test.k6.io');
  userThinkerTime(numeroAleatorioAte(5));
}
