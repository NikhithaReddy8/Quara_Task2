# Quara-Task2

A full-featured Node.js + Express + TypeScript + Sequelize + PostgreSQL API for managing Members and Roles with many-to-many relationships.

---

##  Features

- Add, update, delete, and view members
- Assign and update roles for members (many-to-many relationship)
- View all roles for a member or all members for a role
- Validation using Joi
- Sequelize ORM with UUIDs
- PostgreSQL for database
- TypeScript for type safety
- Clean folder structure 

---

##  Tech Stack

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL
- node-watch 

---
##  Project Structure

```
├── src/
│ ├── config/              # Database configuration
│ ├── controllers/         # Express route handlers
│ ├── models/              # Sequelize models (Member, Role, MemberRole)
│ ├── routes/              # API route definitions
│ ├── services/            # Business logic (optional)
│ ├── types/               # Type definitions (if any)
│ ├── validations/         # Joi schemas and validation logic
│ ├── watch.ts             # Watcher entry file for node-watch
│ └── index.ts             # Application entry point
├── .env                   # Environment variables
├── package.json           # Scripts and dependencies
├── tsconfig.json          # TypeScript compiler options
├── .gitignore             # Git ignore rules
```

## Installation

```bash
git clone https://github.com/NikhithaReddy8/Quara-Task2.git
cd Quara-Task2
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

## Running locally

To build and start the server:

```bash
npm run watch
```
The server will be running on:

```bash
http://localhost:3000
```
You can now access the API endpoints (e.g., /members) at this address.
