# Employee Maintenance - Getting Started Guide

This Employee Maintenance web app, built on NESTJS with a focus on Domain-Driven Design (DDD), adheres to SOLID principles and Clean Architecture. The core domain logic remains independent of the framework, enabling potential transitions to alternatives like Express without substantial rework. Leveraging a memory database for faster integration and end-to-end tests, alongside memory repositories for swift unit tests, the application ensures robustness. Automated tests encompass unit, integration, and end-to-end scenarios, underpinning the reliability and scalability of the solution.

## How to Run the App:

- Run `docker compose up -d` to initiate the necessary infrastructure (databases and services).

- Run `docker exec -it [container_id] bash` to enter in the container.

- Run `npm run start:dev` to start the application.

## Manual tests:

The `api.http file located in the root directory holds a comprehensive list of all available endpoints within the application. If you haven't installed a REST Client extension yet, you can download [here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). This extension will enable you to seamlessly explore and interact with the provided endpoints.

## Running Tests:

- `npm run test`: To execute unit tests.
- `npm run test:e2e`: For e2e tests.