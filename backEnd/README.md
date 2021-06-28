# Inicio

Este aplicação foi construída usando [AdonisJS](https://legacy.adonisjs.com/docs/4.1/installation). As únicas dependências da framework são `Node.js` e `npm`.

## Funcionalidades?

1. Listar tipos de transações
2. Listar transações
3. Listar lojas
4. Mostrar detalhes de uma loja com seu saldo atual
5. Listar as transações importadas por loja bem como o saldo atual da loja
6. Fazer o upload do [arquivo CNAB](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt) e salvar os dados normalizados.

## Como correr

- Instale primeiro o `node js`, e confirme se o `npm` também instalou
- Em seguinda, instale o [`AdonisJS`](https://legacy.adonisjs.com/docs/4.1/installation)
- Execute `npm install` para instalar todas as dependências
- Faz uma cópia do `.env.example` e renomeia para `.env`
- Faz uma cópia do `.env.example` e renomeia para `.env.testing` em ordem para poder correr os testes
- Execute `adonis key:generate` para gerar a chave secreta
- Execute `adonis migration:run` para configurar o banco de dados
- Execute `adonis seed` para popular o banco de dados com dados padrões
- Execute `adonis serve --dev` para correr o servidor, por defeito na porta `3333`
- 
## Como consumidr a API


# REST API

A REST API para o aplicativo de exemplo é descrita abaixo. Os exemplos abaixo foram executados usando o [Postman](https://www.postman.com/).

## Listar tipos de transações

### Request

`GET /transaction-types/`

    http://localhost:3333/transaction-types

### Response

    {
        "status": "success",
        "code": 200,
        "message": null,
        "data": []
    }
    
## Listar transações

### Request

`GET /transactions/`

    http://localhost:3333/transactions

### Response

    {
        "status": "success",
        "code": 200,
        "message": null,
        "data": []
    }

## Listar lojas

### Request

`GET /stores/`

    http://localhost:3333/stores

### Response

    {
        "status": "success",
        "code": 200,
        "message": null,
        "data": []
    }

## Mostrar detalhes de uma loja com seu saldo atual

### Request

`GET /stores/:id`

    http://localhost:3333/stores/2

### Response

    {
        "status": "success",
        "code": 200,
        "message": null,
        "data": {
            "id": 2,
            "store_name": "LOJA DO Ó - MATRIZ",
            "owner_name": "MARIA JOSEFINA",
            "balance": 230
        }
    }

## Listar as transações importadas por loja bem como o saldo atual da loja

### Request

`GET /stores/:storeId/transactions`

    http://localhost:3333/stores/2/transactions

### Response

     {
        "status": "success",
        "code": 200,
        "message": null,
        "data": {
            "store":{
                    "id": 2,
                    "store_name": "LOJA DO Ó - MATRIZ",
                    "owner_name": "MARIA JOSEFINA",
                    "balance": 230
            },
            "transactions": []
        }
    }
    
## Fazer o upload do arquivo CNAB e salvar os dados normalizados.

### Request

`GET /transactions/upload-file`

    http://localhost:3333/transactions/upload-file
OBS: Envie na requisição o arquivo com a estrutura do  [CNAB](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt) que pretende fazer a importação dos dados.
### Response

    {
        "status": "success",
        "code": 200,
        "message": "Transações Importadas Com Sucesso!",
        "data": []
    }
