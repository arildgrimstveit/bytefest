# Bytefest 2025 Landing Page

This repository contains the website for Bytefest 2025, primarily built with Next.js (frontend) and Sanity CMS for content management.

## Prerequisites

- Node.js (LTS version, specifically 20.x as used in deployment)
- Yarn package manager (version 4.7.0 or as managed by Corepack)

## Quick Start

Follow these steps to get the application running locally:

### 1. Clone the repository

```bash
git clone https://github.com/Sopra-Steria-Norge/landingsside-bytefest-2025.git
cd landingsside-bytefest-2025
```

### 2. Set up and run the frontend

```bash
cd frontend

# Enable Corepack to manage Yarn version (if not already enabled)
corepack enable
corepack prepare yarn@4.7.0 --activate # Or your project's specified Yarn version

# Install dependencies
yarn install --immutable # Matches deployment script for consistency

# Create .env.local with required variables (see .env.example)

# Start the development server
yarn dev
```

The frontend will be available at http://localhost:3000

### 3. Set up and run Sanity CMS

```bash
cd sanity # Navigate from the root project directory

# Install dependencies
yarn install

# Start Sanity Studio
yarn dev
```

The Sanity Studio will be available at http://localhost:3333

## Project Structure

- `frontend/`: Next.js application with React, TypeScript, and Tailwind CSS. This is the main user-facing application.
- `sanity/`: Sanity CMS for content management.
- `.github/workflows/`: Contains GitHub Actions workflows, including the deployment pipeline.

## Development Workflow

For local development, you'll typically need to run the frontend development server and the Sanity Studio simultaneously.

1. Start the frontend development server (`cd frontend && yarn dev`).
2. Start the Sanity Studio (`cd sanity && yarn dev`).

## Deployment

This project is automatically deployed to Azure App Service via GitHub Actions when changes are pushed to the `main` branch.

### Deployment Pipeline Overview:

The deployment process is defined in `.github/workflows/azure-deploy.yml` and includes the following key steps:

1.  **Checkout Code**: The `main` branch is checked out.
2.  **Setup Environment**:
    *   Corepack is enabled to manage the Yarn version (specifically Yarn 4.7.0).
    *   Node.js (version 20.x) is set up.
3.  **Install Dependencies**: Frontend dependencies are installed using `yarn install --immutable` within the `frontend` directory.
4.  **Build Application**:
    *   The Next.js application is built using `yarn build` within the `frontend` directory.
    *   Build-time environment variables (e.g., for MSAL and Sanity) are injected from GitHub secrets (`NEXT_PUBLIC_MSAL_CLIENT_ID`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, etc.).
5.  **Prepare Deployment Package**:
    *   A `deploy-package` directory is created.
    *   The Next.js standalone build output (`frontend/.next/standalone/`) is copied.
    *   The entire `frontend/.next/` directory and `frontend/public/` assets are copied.
    *   `frontend/package.json` is included for runtime requirements.
6.  **Deploy to Azure**:
    *   The `azure/webapps-deploy@v3` action is used.
    *   It deploys the content of `deploy-package` to the Azure App Service specified by the `AZURE_APP_NAME` secret, using the `AZURE_PUBLISH_PROFILE` secret for authentication.

### Required Secrets for Deployment:

The GitHub Actions workflow relies on the following secrets being configured in the repository settings:
- `AZURE_APP_NAME`: The name of your Azure App Service.
- `AZURE_PUBLISH_PROFILE`: The XML publish profile for your Azure App Service.
- `NEXT_PUBLIC_MSAL_CLIENT_ID`: MSAL Application (Client) ID for Azure AD integration.
- `NEXT_PUBLIC_MSAL_REDIRECT_URI`: MSAL Redirect URI.
- `NEXT_PUBLIC_MSAL_AUTHORITY_TOKEN`: MSAL Authority Token endpoint.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset name (e.g., "production").
- `SANITY_API_TOKEN`: Your Sanity API token with appropriate permissions.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
