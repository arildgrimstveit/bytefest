# Bytefest 2025 Landing Page

This repository contains the complete website for Bytefest 2025, including the frontend, backend, and CMS components.

## Project Structure

The project is divided into three main components:

- **Frontend**: A Next.js application that serves as the user-facing website
- **Backend**: A Java Spring Boot application that manages data processing and storage
- **Sanity**: A headless CMS for content management

## Prerequisites

Before setting up this project, make sure you have the following installed:

- Node.js (latest LTS version recommended)
- Yarn package manager
- Java JDK
- Maven
- PostgreSQL

## Setting Up the Backend

### PostgreSQL Setup

1. Install PostgreSQL if you haven't already
2. Verify the installation in terminal using the command:
   ```
   postgres -V
   ```
3. Start PostgreSQL using:
   ```
   psql postgres
   ```
4. Create a user for the application:
   ```
   CREATE ROLE bytefest WITH LOGIN PASSWORD 'password';
   ```
5. Create the database:
   ```
   CREATE DATABASE bytefest;
   ```
6. Grant privileges to the user:
   ```
   GRANT ALL PRIVILEGES ON DATABASE bytefest TO bytefest;
   ```
7. Connect to the database:
   ```
   \connect bytefest
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Start the application with Maven:
   ```
   mvn spring-boot:run
   ```

The API will be available at http://localhost:8080.

## Setting Up the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   yarn install
   ```
3. Start the development server:
   ```
   yarn dev
   ```

The frontend development server will be available at http://localhost:3000.

## Setting Up Sanity CMS

1. Navigate to the Sanity directory:
   ```
   cd sanity
   ```
2. Install dependencies:
   ```
   yarn install
   ```
3. Start the Sanity Studio:
   ```
   yarn dev
   ```

The Sanity Studio will be available at http://localhost:3333.

## Development Workflow

For local development, you'll need to run all three components simultaneously:

1. Start the backend server
2. Start the Sanity Studio
3. Start the frontend development server

## Deployment

Instructions for deployment will be added in the future.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
