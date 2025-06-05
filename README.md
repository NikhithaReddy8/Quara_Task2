# Quara-Task1

A simple Node.js + Express + TypeScript + Sequelize + PostgreSQL CRUD application for managing members.

---

##  Features

- Add, update, delete, and view members
- Validations for name and email
- Sequelize ORM with UUID as ID
- REST API built with Express
- PostgreSQL as the database

---

##  Tech Stack

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL

---

##  Project Structure

```
├── src/
│   ├── config/        # Database configuration
│   ├── controllers/   # Express route handlers
│   ├── models/        # Sequelize models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic and data access
│   └── index.ts       # Entry point
├── dist/              # Compiled JavaScript (after build)
├── .env               # Environment variables
├── package.json       # Project metadata and scripts
├── tsconfig.json      # TypeScript configuration
├── .gitignore         # Files/folders ignored by Git
```

## Installation

```bash
git clone https://github.com/<your-username>/Quara-Task1.git
cd Quara-Task1
npm install
```

## Setup

Create a .env file in the root directory with the following content:

```bash
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

## Running the Project

To build and start the server:

```bash
npx tsc     # Compile TypeScript to JavaScript
node dist/index.js
```
