import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';
import { SharedArray } from 'k6/data';

const dados = new SharedArray('dados', () => {
    return JSON.parse(open('./dados/ex05.json'))
})


export const options = {
    cloud: {
        name: 'Exercicio 04',
        projectID: 3715830
    },
    scenarios: {
        ddt: {
            executor: 'shared-iterations',
            vus: 2,
            iterations: dados.length // iterations need to be greater or equal of VU`s  and in this case should be the same as the quantity of the data we are using in the json file
        }
        
    }
};
 

export default function() {
    http.get('http://165.227.93.41/lojinha-web/v2/');
    http.post(
        'http://165.227.93.41/lojinha-web/v2/login/entrar',
        {
            usuario: dados[__VU - 1].usuarioLogin,
            senha: dados[__VU - 1].usuarioSenha
        }, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
    console.log({
        usuario: dados[__VU - 1].usuarioLogin,
        senha: dados[__VU - 1].usuarioSenha
    })

    userThinkerTime(1);
};
