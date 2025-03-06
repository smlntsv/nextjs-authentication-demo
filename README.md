# Next.js Authentication Demo

A demo project showcasing email/password-based authentication flow build with Next.js. This project implements registration, sign-in, and password reset functionalities complete with email notifications. It uses React Server Components, Server Functions, and more to remain fully operational even with JavaScript disabled.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Database Setup](#database-setup)
   - [Configuration](#configuration)
   - [Running the App](#running-the-app)
- [Docker Support](#docker-support)
- [Deployed Project](#deployed-project)
- [License](#license)

## Features

- **JavaScript Independence**: Fully functional when JavaScript is disabled.
- **Authentication Flows**: Supports Sign Up, Sign In, and Password Reset.
- **Email Notification**: Provides email confirmation, password reset, and update notifications.
- **Theming Support**: Offers System, Dark, and Light themes, with automatic preference detection via `prefer-color-scheme` when JavaScript is disabled.
- **Storybook Integration**: Includes stories for main components and email templates.
- **Testing**: End-to-end tests are run with Cypress and unit tests with Vitest.

## Technologies Used
- Next.js
- React
- TypeScript
- PostgreSQL (via Vercel's Neon)
- Cypress
- Vitest

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Git](https://git-scm.com/downloads)
- [Node.js 18.18 or later](https://nodejs.org/en)

### Installation

- **Clone the Repository**

    ```bash
    git clone https://github.com/username/nextjs-aithentication-demo.git
    ```

- **Navigate to the Project Directory and Install Dependencies**

    ```bash
    cd nextjs-aithentication-demo && npm i
    ```

### Database Setup

- **Create and apply database schema**:
  Follow these steps to set up your managed database using Vercel's Neon:

  1. Navigate to https://vercel.com, go to **Storage**, and select **Create Database**.
  2. Choose **"Neon" (Serverless Postgres)** and follow the setup instructions.
  3. Once created, copy and securely store the `DATABASE_URL` from your new database - it will be needed during environment variables configuration. You will replace `POSTGRES_URL` with this value.
  4. Click on the **Open in Neon** button on the database page, navigate to the **SQL Editor**, paste the content of `db/schema.sql` file into the query editor and click **Run**. Verify that the query completed successfully.

### Configuration

- **Set Up Environment Variables**

   Copy the example environment file and customize it:

    ```bash
    cp .env.example .env.development.local
    ```

   Then, open `.env.development.local` and update the necessary values:
   - Replace `POSTGRES_URL` value with the `DATABASE_URL` value you obtained from your Neon database.
   - For Mailer Configuration, create an account on [Mailtrap](https://mailtrap.io) and update `SMTP_USERNAME` and `SMTP_PASSWORD` as needed (all other mail settings should already be set).
   - For E2E tests, you need to provide values for `MAILTRAP_API_TOKEN`, `MAILTRAP_TEST_INBOX_ID`, and `MAILTRAP_ACCOUNT_ID`.

### Running the App

- **Start the Next.js Development Server**

    ```bash
    npm run dev
    ```

    > By default, the app will run at [http://localhost:3000](http://localhost:3000)

- **Start the Storybook Development Server**

    ```bash
   npm run storybook 
   ```

   > By default, it will run at [http://localhost:6006](http://localhost:6006)

## Docker Support

This project includes `Dockerfile` and `release.sh` script to simplify building and deploying Docker images. The `release.sh` script automates the process of building the Docker image and pushing it to a specified Docker registry.

### Usage

- **Set the Docker Registry**

   Ensure the `DOCKER_REGISTRY` environment variable is set to your desired Docker registry.

- **Build and Push the Docker Image**

   Run the following command to build the image and push it to your registry.

- ```bash
   ./release.sh
   ```

## Deployed Project

You can view the deployed version of this project here: [https://nextjs-authentication-demo.dima-dev.com/](https://https://nextjs-authentication-demo.dima-dev.com/)

## License

This project is licensed under the [MIT License](LICENSE).
