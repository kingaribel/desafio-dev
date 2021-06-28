# Sobre o projecto

Este projecto consiste em parsear [este arquivo de texto(CNAB)](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt) e salvar suas informações(transações financeiras) em uma base de dados MySQL. Este arquivo CNAB contém dados das movimentações financeiras de várias lojas.

Para realizar a importação dos dados, o sistema conta com uma interface gráfica (frontEnd) feita em Angular12, na qual possui um formulário para fazer o upload do [arquivo CNAB](https://github.com/ByCodersTec/desafio-ruby-on-rails/blob/master/CNAB.txt), em seguida os dados são enviados para a API (backEnd), que faz normalização dos dados, armazena-os em um banco de dados relacional e exibe as informações na tela.

**A aplicação web TEM:**

1. Uma tela (via um formulário) para fazer o upload do arquivo.
2. Interpreta ("parsear") o arquivo recebido, normaliza os dados, e salva corretamente a informação em um banco de dados MySQL.
3. Exibe uma lista das operações importadas por lojas, e nesta lista tem um totalizador do saldo em conta de cada loja
4. Escrita com node.js usando a framework AdonisJS v4, e para o lado cliente Angular12.
5. Simples de configurar e rodar, funciona em ambiente compatível com Unix (Linux ou Mac OS X). Utiliza apenas linguagens e bibliotecas livres ou gratuitas.
8. Tem testes automatizados no backEnd
11. Inclui informação descrevendo como consumir o endpoint da API

# Documentação das tabelas do banco de dados

**Tipos de transações (transaction_types)**
| Descrição do campo  | Tipo de Dados | Comentário
| ------------- | ------------- | ------
| description  | String  | Descrição do tipo de transação
| operation  | String | Operação do tipo transação (**+** significa entrada; **-** significa saída)

**Donos de Loja (store_owners)**
| Descrição do campo  | Tipo de Dados | Comentário
| ------------- | ------------- | ------
| owner_name  | String  | Nome do dono da loja

**Lojas (stores)**
| Descrição do campo  | Tipo de Dados | Comentário
| ------------- | ------------- | ------
| store_name  | String  | Nome da loja
| owner_id  | Inteiro | Chave estrangeira que referencia o dono da loja

**Transações (transactions)**
| Descrição do campo  | Tipo de Dados | Comentário
| ------------- | ------------- | ------
| occurrency_date  | DateTime  | Data e hora da transação
| amount  | Real  | Valor da transação
| cpf_benefited  | String  | CPF do beneficiário
| card_number  | Inteiro  | Número do cartão utilizado na transação
| store_id  | Inteiro | Chave estrangeira que referencia a loja
| transaction_type_id  | Inteiro | Chave estrangeira que referencia o tipo de transação

# Configuração do FrontEnd

Clique neste link aqui: [setup](https://github.com/kingaribel/desafio-dev/tree/main/frontEnd#readme).

# Configuração do BackEnd

Clique neste link aqui: [setup](https://github.com/kingaribel/desafio-dev/tree/main/backEnd#readme).

