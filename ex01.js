import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';
import { numeroAleatorioAte } from './utils/numeros.js';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  http.get('https://test.k6.io');
  userThinkerTime(numeroAleatorioAte(5));
}
