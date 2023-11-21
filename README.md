# API RESTful de Banco com Express e Node.js

Este projeto é uma API RESTful de um banco, desenvolvida utilizando Node.js, Express e JavaScript. O objetivo principal é fornecer endpoints para operações bancárias básicas, como criação de conta, depósito, saque, transferência, consulta de saldo e emissão de extrato.

## Tecnologias Utilizadas

- **Node.js:** Plataforma para execução de código JavaScript do lado do servidor.
- **Express:** Framework web para Node.js, utilizado para criar APIs de forma simples e eficiente.
- **JavaScript:** Linguagem de programação utilizada para desenvolver a lógica da aplicação.
- **Middlewares:** Componentes intermediários para processamento de requisições e respostas HTTP.

## Funcionalidades Principais

- **Listar Contas:** Endpoint para listar todas as contas existentes no banco.
- **Criar Conta:** Endpoint para criar uma nova conta bancária.
- **Atualizar Usuário:** Endpoint para atualizar informações do usuário associado à conta.
- **Excluir Conta:** Endpoint para excluir uma conta bancária.
- **Depositar:** Endpoint para realizar depósitos em uma conta.
- **Sacar:** Endpoint para realizar saques de uma conta.
- **Transferir:** Endpoint para transferir valores entre contas.
- **Consultar Saldo:** Endpoint para consultar o saldo de uma conta.
- **Emitir Extrato:** Endpoint para emitir um extrato bancário de uma conta.

## Estrutura do Código

A API está organizada em diferentes rotas e middlewares para lidar com cada operação bancária de forma eficiente. 

- `listarContas`: Retorna a lista de todas as contas existentes.
- `criarConta`: Cria uma nova conta bancária.
- `atualizarUsuario`: Atualiza as informações do usuário associado à conta.
- `excluirConta`: Exclui uma conta bancária, se o saldo for zero.
- `depositar`: Realiza um depósito em uma conta.
- `sacar`: Realiza um saque de uma conta.
- `transferir`: Efetua a transferência entre contas.
- `consultarSaldo`: Consulta o saldo de uma conta.
- `emitirExtrato`: Emite um extrato bancário de uma conta.

O projeto segue padrões RESTful para uma estrutura de URL bem definida e organizada, permitindo interações com a API de forma clara e intuitiva.

Os middlewares são utilizados para validar dados, autenticar usuários, realizar verificações de saldo, entre outras funcionalidades.

Para executar este projeto localmente, é necessário ter o Node.js instalado. Clone o repositório, instale as dependências utilizando `npm install` e inicie o servidor com `npm start`.

Fique à vontade para explorar o código-fonte e contribuir para melhorias e novas funcionalidades!
