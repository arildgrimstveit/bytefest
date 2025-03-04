# Bytefest 2025 Frontend

This is the frontend application for the Bytefest 2025 event website, built with Next.js and integrated with Sanity CMS.

## Technologies Used

- [Next.js](https://nextjs.org) (v15.1)
- [React](https://react.dev) (v19.0)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (v4.0)
- [Sanity.io](https://www.sanity.io/) client libraries for content fetching
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager (v4.7.0 or later)

### Installation

1. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js application routes and page components
- `src/components`: Reusable React components
- `src/styles`: Global styles and Tailwind configuration
- `src/types`: TypeScript type definitions

## Integrations

### Sanity CMS Integration

This frontend connects to the Sanity CMS included in this project. Content is fetched using the Sanity client and displayed using the appropriate components.

### API Integration

The application connects to the Spring Boot backend API for data processing when needed.

## Deployment

Build the application for production:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

## Learn More

For more information about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
