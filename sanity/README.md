# Bytefest 2025 - Sanity CMS

This directory contains the Sanity Content Management System (CMS) for the Bytefest 2025 event website. Sanity is a headless CMS that provides a flexible and customizable content management solution.

## Technologies Used

- [Sanity](https://www.sanity.io/) (v3.71)
- [React](https://react.dev) (v18.2)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/) for UI styling

## Features

- Content management for the Bytefest 2025 website
- Customized schema for event data
- Real-time content editing
- Content versioning and history

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager (v4.7.0 or later)
- A Sanity.io account

### Installation

1. Install dependencies:

```bash
yarn install
```

2. Initialize your Sanity project (if not already done):

```bash
npx sanity init
```

Follow the prompts to set up your project. You can choose to use an existing project or create a new one.

3. Start the Sanity Studio development server:

```bash
yarn dev
```

The Sanity Studio will be available at [http://localhost:3333](http://localhost:3333).

## Project Structure

- `schemas/`: Content schemas that define the structure of your content
- `static/`: Static assets for the Sanity Studio
- `.sanity/`: Sanity configuration files
- `sanity.config.ts`: Main configuration file for Sanity
- `sanity.cli.ts`: CLI configuration for Sanity

## Deploying Sanity Studio

To build and deploy the Sanity Studio:

```bash
# Build the studio
yarn build

# Deploy to Sanity's servers
yarn deploy
```

Once deployed, the studio will be available at `https://bytefest-2025.sanity.studio/` (or your custom domain if configured).

## Integration with Frontend

The frontend Next.js application uses the `@sanity/client` package to fetch content from this CMS. The connection is configured in the frontend's `src/sanityClient.ts` file.

## Documentation

For more information about Sanity:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [Sanity Query Language (GROQ)](https://www.sanity.io/docs/groq)
