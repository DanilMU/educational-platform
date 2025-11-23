## Project Overview

This is a full-stack monorepo project for an educational platform.

*   **Frontend:** [Next.js](https://nextjs.org/) (React framework)
*   **Backend:** [NestJS](https://nestjs.com/) (Node.js framework)
*   **Database:** [Prisma](https://www.prisma.io/) ORM
*   **Package Manager:** [Yarn](https://yarnpkg.com/)

The project is structured as a monorepo with two main packages: `frontend` and `backend`.

### License

This software is licensed under the **MIT License with Commons Clause License Condition**.

**Important:** You cannot sell this software. See the [LICENSE](LICENSE) file for more details.

## Getting Started

### Prerequisites

Make sure you have [Yarn](https://yarnpkg.com/getting-started/install) installed.

### Installation

It is recommended to run `yarn install` at the root of the project, as well as in the `frontend` and `backend` directories to ensure all dependencies are installed correctly.

```bash
# Install root dependencies
yarn install

# Install backend dependencies
cd backend
yarn install
cd ..

# Install frontend dependencies
cd frontend
yarn install
cd ..
```

## Development

### Backend (`/backend`)

The backend is a NestJS application.

*   **Run in development mode (with watch):**
    ```bash
    cd backend
    yarn start:dev
    ```

*   **Run tests:**
    ```bash
    cd backend
    yarn test
    ```

*   **Database migrations:**
    ```bash
    cd backend
    yarn prisma migrate dev
    ```

### Frontend (`/frontend`)

The frontend is a Next.js application.

*   **Run the development server:**
    ```bash
    cd frontend
    yarn dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

*   **Generate API client:**
    The frontend uses `orval` to generate a type-safe API client from the backend's OpenAPI specification. Before running the frontend for the first time, or after any backend API changes, run this command:
    ```bash
    cd frontend
    yarn generate
    ```

## Building for Production

*   **Backend:**
    ```bash
    cd backend
    yarn build
    yarn start:prod
    ```

*   **Frontend:**
    ```bash
    cd frontend
    yarn build
    yarn start
    ```
