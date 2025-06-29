# Node Contacts CRUD API

[![codecov](https://codecov.io/github/simonrevill/node-contacts-crud-api/branch/main/graph/badge.svg?token=QTB4X3Y34Y)](https://codecov.io/github/simonrevill/node-contacts-crud-api)
[![CI pipeline](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa.yml/badge.svg?branch=main)](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa.yml)
[![Backend Mutation Tests](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa_mutation.yml/badge.svg)](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa_mutation.yml)
[![Playwright Tests](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/e2e_qa.yml/badge.svg)](https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/e2e_qa.yml)

## Introduction

This project is my attempt at using TDD to build and consume a basic REST API to help you manage a list of contacts.

## Running the tests

### Backend and Frontend Unit Tests:

```shell
$ npm run test:unit
```

## Domain

A contact is currently defined as:

```ts
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}
```

The API runs on a simple server powered by Express and a PostgreSQL database. All endpoints are protected by validation schemas and provide thorough responses, including any errors if necessary.

In the test environment, the database is added via dependency injection as an in-memory version using the `pg-mem` package.

## Routes

The available API routes are as follows:

| CRUD Operation   | HTTP Method | Endpoint          |
| ---------------- | ----------- | ----------------- |
| Get all contacts | GET         | /api/contacts     |
| Get a contact    | GET         | /api/contacts/:id |
| Create a contact | POST        | /api/contacts     |
| Update a contact | PUT         | /api/contacts/:id |
| Delete a contact | DELETE      | /api/contacts/:id |
