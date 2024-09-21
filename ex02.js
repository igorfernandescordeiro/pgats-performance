import http from 'k6/http';
import { sleep, check } from 'k6';


export const options = {
  vus: 1,
  iterations: 1,
};


export default function () {
  const respostaHomePageLojinha = http.get('http://165.227.93.41/lojinha-web/v2/');
  // console.log(`RESPONSE: ${respostaHomePageLojinha.html().find(`h4`).text()}`)

  check(respostaHomePageLojinha, {
    'Checar se o Status code é igual a 200': r => r.status === 200,
    'Checar título é Lojinha': r => r.html().find(`title`).text() === 'Lojinha'
  })


  const responseLogin = http.post('http://165.227.93.41/lojinha-web/v2/login/entrar', {
    usuario: 'admin',
    senha: 'admin'
  }, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })

  // const cookieJar = http.cookieJar();
  // const cookies = cookieJar.cookiesForURL(responseLogin.url);



  http.get('http://165.227.93.41/lojinha-web/v2/produto', {
    // cookies: cookies
  })

  http.get('http://165.227.93.41/lojinha-web/v2/produto/novo', {
    // cookies: cookies
  })

  const payloadSalvarProduto = {

    produtonome: 'TESTEIGORCORDEIRO',
    produtovalor: 10,
    produtocores: 'VERMELHO, PRETO'

  };

  const opcoesRequestSalvarProduto = {

    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }

  };


  const responseSalvarProduto = http.post('http://165.227.93.41/lojinha-web/v2/produto/salvarproduto', payloadSalvarProduto, opcoesRequestSalvarProduto);

  // console.log(responseSalvarProduto)


  check(responseSalvarProduto, {
    'Validando que o produto foi salvo com sucesso': (r) => r.headers['Refresh'].includes('sucesso')
  });

  const responseAbrirEdicaoProduto = http.get(responseSalvarProduto.headers['Refresh'].replace('0;url=', '').replaceAll(' ', '%20'));
  // const respostaAbrirEdicaoProduto = http.get(encodeURI(respostaSalvarProduto.headers['Refresh'].replace('0;url=', ''))) //essta opcao foi do Julio

  // console.log(responseAbrirEdicaoProduto)

  check(responseAbrirEdicaoProduto, {
    'Validando que estou na pagina de Edição do Produto': (r) => r.html().find('#produtonome').attr('value') === 'TESTEIGORCORDEIRO'
  });



  sleep(1);
}
