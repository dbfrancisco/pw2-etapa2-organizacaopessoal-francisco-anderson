# Organização Pessoal — Projetos e Tarefas

API REST para gerenciar projetos e tarefas pessoais/academicos usando Node.js, Express 5 e arrays em memória.

## Requisitos

- Node.js
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

Ou em modo de desenvolvimento:

```bash
npm run dev
```

## Endpoints principais

- `GET /projetos`
- `GET /projetos/:id`
- `POST /projetos`
- `PUT /projetos/:id`
- `DELETE /projetos/:id`
- `GET /tarefas`
- `GET /tarefas/:id`
- `POST /tarefas`
- `PUT /tarefas/:id`
- `DELETE /tarefas/:id`
- `GET /projetos/:id/tarefas`

## Observações

- Os dados são armazenados em memória durante a execução do servidor.
- A exclusão de um projeto só é permitida quando ele não possui tarefas vinculadas.
- Os filtros facultativos em `GET /tarefas` aceitam `projetoId` e `concluida`.
