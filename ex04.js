import http from 'k6/http';
import { sleep as userThinkerTime } from 'k6';

export const options = {
    cloud: {
        name: 'Exercicio 04',
        projectID: 3715830
    },
    scenarios: {
        usuarioCurioso: {
            executor: 'ramping-vus',
            stages: [
                {target: 3, duration:'5s'},
                {target: 3, duration:'30s'},
                {target: 0, duration:'5s'},
            ],
            exec: 'acessoCurioso'
        },
        usuarioCadastrado: {
            executor: 'ramping-vus',
            stages: [
                {target: 10, duration:'1s'},
                {target: 0, duration:'1s'},
            ],
            exec: 'acessoDeUsuarioCadastrado',
            startTime: '10s'

        }
    }
};
// when you use - export default function() -  you are creating only one test, if you need to do more tests simultaneously you need to remove the 'default' and name the function.
// if you try to run the test just doing that it will get an error because there is no function default
export function acessoCurioso() {
    http.get('http://165.227.93.41/lojinha-web/v2/');
    userThinkerTime(1);
};

export function acessoDeUsuarioCadastrado() {
    http.get('http://165.227.93.41/lojinha-web/v2/');
    http.post(
        'http://165.227.93.41/lojinha-web/v2/login/entrar',
        {
            usuario: 'cgts',
            senha: '123456'
        }, {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
    http.get('http://165.227.93.41/lojinha-web/v2/login/produto')

    userThinkerTime(1);
};
