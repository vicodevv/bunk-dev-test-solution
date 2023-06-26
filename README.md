# Bunk Dev Test - Holiday Expenses Calculator

A code challenge for new developers applying to work at Bunk.

## Technologies

This API was developed with the following technologies:

- NodeJS
- Express
- Typescript

The UI was developed with the following technologies:

- Angular
- Typescript

Testing was done with the following technologies:

- Jest
- Supertest
- Cypress

## Getting Started

Pre-requisites

- NodeJS v14.0.0 or higher
- NPM v9.0.0 or higher
- Angular CLI v14.0.0 or higher

You can get the latest version of NodeJS from [here](https://nodejs.org/en/download/) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  node -v
```

You can get the latest version of NPM from [here](https://www.npmjs.com/get-npm) or you can check the version you have installed on your machine by running the following command in your terminal

```bash
  npm -v
```

You can get the latest version of Angular CLI by running the following command in your terminal

```bash
  npm install -g @angular/cli
```

## Installation

Clone the project

```bash
  git clone git@github.com:vicodevv/bunk-dev-test-solution.git
```

Go to the project directory

```bash
  cd bunk-dev-test-solution
```

Install dependencies

To install the root dependencies such as 'cocurrently' , run the following command in your terminal

```bash
  npm install
```

To install the dependencies for the UI and API, run the following command in your terminal

```bash
  npm install-all
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- PORT=your port number

Run the code

```bash
  npm run start
```

## Running Tests

To test the API, run the following command in your terminal

```bash
  npm run test
```

The tests are written with Jest and Supertest and the test cases should run in the terminal

To test the UI, run the following command in your terminal

```bash
  npm run e2e
```

The tests are written with Cypress

- For the UI, a new browser window should open, after which you can select the E2E Testing option

- You can choose which browser to run the tests, preferralbly Chrome.

- Click on the Start Tests button to run the tests. A new browser window should open and the tests directory should be displayed in the browser. Locate the spec.cy.ts file and click on it to run the tests.

NOTE: The E2E tests will not run if the API is already running on port 3000. You can stop the API and run the tests again.

## Postman Documentation

https://documenter.getpostman.com/view/17026180/2s93z6e4CK
