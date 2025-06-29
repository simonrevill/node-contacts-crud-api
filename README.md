# Node Contacts CRUD API

<style>
  .reports {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 48rem;
    margin: 0 auto
  }

  .reports__report {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1
  }

  .reports__report-badge-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .reports__report-title {
    margin: 0;
  }

  @media screen and (min-width: 48rem) {
    .reports {
      flex-direction: row;
    }
  }
</style>

<div class="reports">
    <div class="reports__report">
      <h3 class="reports__report-title">CI Status</h3>
      <div class="reports__report-badge-group">
        <a href="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa.yml">
          <img src="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa.yml/badge.svg?branch=main" alt="CI pipeline"/>
        </a>
        <a href="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa_mutation.yml">
          <img src="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/backend_qa_mutation.yml/badge.svg" alt="Backend Mutation Tests"/>
        </a>
        <a href="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/e2e_qa.yml">
          <img src="https://github.com/simonrevill/node-contacts-crud-api/actions/workflows/e2e_qa.yml/badge.svg" alt="Playwright Tests"/>
        </a>
      </div>
    </div>
    <div class="reports__report">
      <h3 class="reports__report-title">Coverage</h3>
      <div class="reports__report-badge-group">
        <a href="https://codecov.io/github/simonrevill/node-contacts-crud-api">
          <img src="https://codecov.io/github/simonrevill/node-contacts-crud-api/branch/main/graph/badge.svg?token=QTB4X3Y34Y" alt="codecov"/>
        </a>
      </div>
    </div>
</div>

## Introduction

This project is my attempt at using TDD to build and consume a basic REST API to help you manage a list of contacts.

The goal of the project is to present a simple CRUD application that is thoroughly tested, with clear separation of concerns throughout the backend and frontend. This means the app is easy to change over time and I can be confident in my code.

To help me acheive this I have use the following:

- Test-driven development (TDD)
- Mutation tests
- GitHub Actions running all test suites, perform type checks, linting, and generating test report artifacts ready for future analysis.
- Monorepo structure to keep all related code in one place.

## Getting started

### Running the tests

#### Run backend and frontend unit tests:

```shell
$ npm run test:unit
```

#### Run end-to-end tests:

```shell
$ npm run test:e2e
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

## Frontend

The frontend application is built using TypeScript, React and Chakra UI. All domain logic is tested independently of the UI adding extra flexibility.
