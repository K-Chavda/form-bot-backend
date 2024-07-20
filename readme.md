# Project Title

A brief description of what this project is about and its primary purpose.

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Requirements Gathering](#requirements-gathering)
- [Backend Setup](#backend-setup)
  - [Folder Structure](#folder-structure)
  - [Database Connection](#database-connection)
  - [Installed NPM Packages](#installed-npm-packages)
- [Development Planning](#development-planning)
  - [Backend Models](#backend-models)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Requirements Gathering

Gathered all necessary requirements to ensure a comprehensive understanding of the project scope and objectives.

## Backend Setup

Started setting up the backend to create a robust foundation for the application.

### Folder Structure

Created the following folder and file structure to organize the backend code:

```
src
|_ controllers
|_ db
  |_ dbConnect.js
|_ middlewares
|_ models
|_ routes
|_ utils
|_ app.js
|_ constants.js
|_ index.js
.env
package-lock.json
package.json
```

### Database Connection

Set up the database connection in `src/db/dbConnect.js`.

### Installed NPM Packages

Installed the following npm packages to facilitate backend development:

- `nodemon`: For automatically restarting the server during development.
- `express`: To create the server and handle routing.
- `jsonwebtoken`: For handling JSON Web Tokens (JWT) for authentication.
- `bcrypt`: For hashing passwords.
- `mongoose`: To interact with MongoDB.
- `dotenv`: For managing environment variables.
- `cors`: For enabling Cross-Origin Resource Sharing.

## Development Planning

Planned the entire backend model structure using Excalidraw to get better insights into the development plan.

Excalidraw File URL: https://excalidraw.com/#json=bKgQkUqj_OjWh93wsx65m,-V4faDbMSqV-Pp5AuLKjTw

### Backend Models

Outlined and designed the backend models to streamline the development process and ensure data consistency.

## Environment Variables

Created an `.env` file to manage environment-specific variables. Ensure this file is included in the `.gitignore` to avoid exposing sensitive information.

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repository
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables in a `.env` file.

5. Start the development server:
   ```bash
   npm run dev
   ```
