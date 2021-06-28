# Inicio

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 12.0.1. Certifique-se de ter o [Angular CLI](https://github.com/angular/angular-cli#installation) instalado globalmente. Usamos [npm](https://nodejs.org/en) para gerenciar as dependências, por isso recomendamos fortemente que você o use. Você pode instalá-lo [aqui](https://nodejs.org/en/download) e, em seguida, executar `npm install` para resolver todas as dependências (pode demorar um ou dois minutos).

### Conexão com a API

Para que a aplicação se comunique com o banco de dados, temos um servidor de API para que a aplicação faça solicitações. Você pode ver [as especificações da API aqui](https://github.com/kingaribel/desafio-dev/blob/main/backEnd) que contém todas as rotas e respostas para o servidor.

O código-fonte do servidor backend (disponível para node.js) pode ser encontrado no [repositório desafio-dev](https://github.com/kingaribel/desafio-dev).

Se você quiser alterar a URL da API para um outro servidor, simplesmente edite `src/environment/ environment.ts` e altere` baseUrl` para a URL do servidor que deseja (ou seja, `localhost:3333/api`)

Execute `ng serve` para um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.

### Construindo o projeto
Execute `ng build` para construir o projeto. Os artefatos de construção serão armazenados no diretório `dist/`. Use o sinalizador `--prod` para uma construção de produção.

## Visão geral da funcionalidade

O aplicativo é um sistema para importação dos dados de transações de variadíssimas lojas através de um ficheiro de texto, chamado CNAB. Ele usa uma API personalizada para todas as solicitações.

**Funcionalidade geral:**

- Importação do [arquivo CNAB](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt)
- Transações importadas
