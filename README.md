# Node Contacts CRUD API

[![codecov](https://codecov.io/github/simonrevill/node-contacts-crud-api/branch/main/graph/badge.svg?token=QTB4X3Y34Y)](https://codecov.io/github/simonrevill/node-contacts-crud-api)

This project is my attempt at using TDD to build and consume a basic REST API.

The REST API specification is as follows:

| CRUD Operation   | HTTP Method | Endpoint          |
| ---------------- | ----------- | ----------------- |
| Get all contacts | GET         | /api/contacts     |
| Get a contact    | GET         | /api/contacts/:id |
| Create a contact | POST        | /api/contacts     |
| Update a contact | PUT         | /api/contacts/:id |
| Delete a contact | DELETE      | /api/contacts/:id |
