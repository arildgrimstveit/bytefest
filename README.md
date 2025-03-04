# Bytefest 2025 Landing Page

This repository contains the website for Bytefest 2025, including frontend (Next.js), backend (Spring Boot), and Sanity CMS components.

## Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager
- Java JDK 17+
- PostgreSQL

## Quick Start

Follow these steps to get the application running locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/landingsside-bytefest-2025.git
cd landingsside-bytefest-2025
```

### 2. Set up the database

```bash
# Start PostgreSQL
psql postgres

# Create database and user (in PostgreSQL console)
CREATE ROLE bytefest WITH LOGIN PASSWORD 'password';
CREATE DATABASE bytefest;
GRANT ALL PRIVILEGES ON DATABASE bytefest TO bytefest;
\q
```

### 3. Set up and run the backend

```bash
cd backend

# Start the Spring Boot application
mvn spring-boot:run
```

The API will be available at http://localhost:8080

### 4. Set up and run the frontend

```bash
cd frontend

# Install dependencies
yarn install

# Create .env.local with required variables
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token" > .env.local

# Start the development server
yarn dev
```

The frontend will be available at http://localhost:3000

### 5. Set up and run Sanity CMS

```bash
cd sanity

# Install dependencies
yarn install

# Start Sanity Studio
yarn dev
```

The Sanity Studio will be available at http://localhost:3333

## Project Structure

- `frontend/`: Next.js application with React, TypeScript, and Tailwind CSS
- `backend/`: Java Spring Boot application with PostgreSQL database
- `sanity/`: Sanity CMS for content management

## Development Workflow

For local development, you'll need to run all three components simultaneously:

1. Start the backend server
2. Start the frontend development server
3. Start the Sanity Studio

## Deployment

Instructions for deployment will be added in the future.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
