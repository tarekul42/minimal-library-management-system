# Minimal Library Management System

![CI](https://github.com/tarekul42/minimal-library-management-system/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/tarekul42/minimal-library-management-system/actions/workflows/cd.yml/badge.svg)

This is a simple, modern web application for managing a small library. It allows users to add, edit, view, and delete books, as well as manage borrowing records.

## Features

-   **Book Management:** Full CRUD (Create, Read, Update, Delete) functionality for books.
-   **Borrowing System:** Track book borrowing and returns.
-   **Responsive UI:** A clean, modern, and responsive user interface built for ease of use.
-   **Form Validation:** Robust client-side validation for all forms.

## Tech Stack

This project is built with a modern frontend stack:

-   **Framework:** [React](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:**
    -   [shadcn/ui](https://ui.shadcn.com/) (using Radix UI primitives)
    -   Icons from [Lucide React](https://lucide.dev/guide/packages/lucide-react)
-   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (including RTK Query for data fetching)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Form Handling:** [React Hook Form](https://react-hook-form.com/)
-   **Schema Validation:** [Zod](https://zod.dev/)
-   **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 20.x or higher) and [npm](https://www.npmjs.com/) installed on your system.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/tarekul42/minimal-library-management-system.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd minimal-library-management-system
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Development

To run the application in development mode with hot-reloading, execute the following command:

```sh
npm run dev
```

This will start the development server, typically at `http://localhost:5173`.

### Build

To build the application for production, use:

```sh
npm run build
```

This command bundles the app into static files for deployment in the `dist/` directory.

### Linting

To run the linter and check for code quality issues, use:

```sh
npm run lint
```

## Folder Structure

The project follows a feature-oriented structure to keep the codebase organized and maintainable.

```
/src
├───assets/         # Static assets like images and SVGs
├───components/     # Reusable UI components (including shadcn/ui components)
├───config/         # Application-wide configurations (e.g., form fields)
├───hooks/          # Custom React hooks
├───lib/            # Utility functions
├───pages/          # Top-level page components for each route
├───redux/          # Redux Toolkit store, slices, and API definitions (RTK Query)
├───routes/         # Application routing setup
├───schema/         # Zod schemas for data validation
└───types/          # TypeScript type definitions
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

### CI Workflow
- **Triggers**: Runs on every push and pull request to `main` and `develop` branches
- **Node Versions**: Tests on Node.js 18.x and 20.x for compatibility
- **Steps**:
  - Linting with ESLint
  - TypeScript compilation
  - Production build verification
  - Upload build artifacts

### CD Workflow
- **Triggers**: Runs on every push to `main` branch
- **Deployment**: Automatically deploys to Vercel
- **Steps**:
  - Build production bundle
  - Deploy to Vercel production environment

### Setting up Vercel Deployment

To enable automatic deployment to Vercel, you need to add the following secrets to your GitHub repository:

1. **VERCEL_TOKEN**: Your Vercel authentication token
   - Go to [Vercel Account Settings > Tokens](https://vercel.com/account/tokens)
   - Create a new token and copy it

2. **VERCEL_ORG_ID**: Your Vercel organization ID
   - Run `npx vercel link` in your project directory
   - Find the value in `.vercel/project.json`

3. **VERCEL_PROJECT_ID**: Your Vercel project ID
   - Same as above, found in `.vercel/project.json`

4. Add these secrets to your GitHub repository:
   - Go to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add each secret with its corresponding value

---

## Contact

Name: Tarekul Islam

Email: tarekulrifat142@gmail.com
