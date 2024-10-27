# PGATS Performance Testing

Este repositório contém scripts para realizar testes de carga utilizando o K6. O objetivo é avaliar o desempenho da aplicação PGATS, identificando possíveis gargalos e comportamentos sob carga.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar os Testes](#como-executar-os-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Resultados](#resultados)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Tecnologias Utilizadas

- [K6](https://k6.io/) - Ferramenta de testes de carga.
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript.
- [GitHub Actions](https://github.com/features/actions) - Integração contínua para execução automatizada de testes.

## Pré-requisitos

Antes de executar os testes, você precisa ter:

- Node.js instalado (versão 20 ou superior).
- Acesso ao repositório do PGATS.
- Dependências necessárias instaladas.

## Como Executar os Testes

1. Clone o repositório:
   ```bash
   git clone https://github.com/igorfernandescordeiro/pgats-performance.git
   cd pgats-performance
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute os testes de carga:
   ```bash
   k6 run --out json=./report.json ex01.js
   ```

4. Para executar múltiplos testes, você pode usar o arquivo `index.js` (se disponível) que importa todos os testes.

## Estrutura do Projeto

```
pgats-performance/
│
├── ex01.js          # Script de teste de carga 1
├── ex02.js          # Script de teste de carga 2
├── index.js         # Arquivo principal que executa todos os testes (se aplicável)
├── utils/           # Funções utilitárias (ex: random number generation)
├── .github/         # Configurações do GitHub Actions
│   └── workflows/
│       └── k6-test.yml  # Workflow para executar testes automaticamente
├── README.md        # Documentação do projeto
└── ...
```

## Resultados

Os resultados dos testes são salvos no arquivo `report.json`. Você pode visualizar o relatório utilizando um editor de texto ou uma ferramenta de visualização de JSON.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
