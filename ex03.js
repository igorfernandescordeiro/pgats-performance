import http from "k6/http";
import { check, group, sleep } from "k6";
import { faker } from 'https://esm.sh/@faker-js/faker';


export default function () {

  let token;

  group('Obtendo o token do usuario', () => {
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


    check(responseLogin, {
      'status code é 200': r => r.status === 200,
      'validar mensagem de sucesso': r => r.json().message === 'Sucesso ao realizar o login'
    })
    token = responseLogin.json('data.token');
  })


  // ----------------------------------------------------------
  group('Cadastrar um novo produto', () => {

    // cadastrar um produto

    const responseCadastroProduto = http.post(
      'http://165.227.93.41/lojinha/v2/produtos',
      JSON.stringify({
        produtoNome: faker.food.fruit(),
        produtoValor: 233,
        produtoCores: [
          "preto", "verde"
        ]
      }),
      {
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      }
    )
    console.log(responseCadastroProduto.body)

    check(responseCadastroProduto, {
      'status code é 201': r => r.status === 201,
      'validar mensagem de sucesso': r => r.json().message === 'Produto adicionado com sucesso',
      'validar segunda cor do produto': r => r.json('data.produtoCores.1') === 'verde'
    })

    console.log(responseCadastroProduto.json('data.produtoCores.#'))
  })

  group('User Think Time após o cadastro', () => {

    sleep(1);
    
  })
}
