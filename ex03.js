import http from "k6/http";
import { sleep } from "k6";


export default function() {

    const bodyLogin = JSON.stringify({
        usuarioLogin: 'cgts',
        usuarioSenha: '123456'
      });
    
      const opcoesLogin = {
        headers: {
          'Content-type': 'application/json'
        }
      };



    const responseLogin = http.post('http://165.227.93.41/lojinha/v2/login', bodyLogin, opcoesLogin);
    sleep(1);

    console.log(responseLogin);
}