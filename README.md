# Node Contacts CRUD API

[![codecov](https://codecov.io/github/simonrevill/node-contacts-crud-api/branch/main/graph/badge.svg?token=QTB4X3Y34Y)](https://codecov.io/github/simonrevill/node-contacts-crud-api)

## Introduction

This project is my attempt at using TDD to build and consume a basic REST API to help you manage a list of contacts.

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
