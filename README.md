# Daily Tasks Report

This is a full-stack application for managing daily employee tasks. It includes a **backend** built with Node.js/Express and a **frontend** built with React/Vite.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Docker](https://www.docker.com/) (if running with Docker)
- [PostgreSQL](https://www.postgresql.org/) (for local backend development)

---

## Backend Setup (daily-tasks-be)

### Running Locally

1. Navigate to the `daily-tasks-be` directory:

   ```bash
   cd daily-tasks-be
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```plaintext
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=tasks_db
   ```

4. Start the backend server:

   ```bash
   npm start:dev
   ```

### Running with Docker

1. Build and start the backend container using Docker:

   ```bash
   docker-compose up --build
   ```

---

## Frontend Setup (daily-tasks-report)

### Running Locally

1. Navigate to the `daily-tasks-report` directory:

   ```bash
   cd daily-tasks-report
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Running with Docker

1. Build and start the frontend container using Docker:

   ```bash
   docker-compose up --build
   ```


That's it! You can now access the frontend at `http://localhost` and the backend at `http://localhost:3000`.
```

This version focuses on just the installation and running steps for both projects.
