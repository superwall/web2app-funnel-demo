# Web2App Base

A starter project for building web applications with React, TypeScript, Tailwind CSS, and Cloudflare Pages.

## Features

- React + TypeScript
- Tailwind CSS for styling
- Vite for fast development
- Cloudflare Pages for hosting and serverless functions
- API backend using Cloudflare Workers

## Chat Functionality

This project includes a simple chat interface with a Cloudflare Pages Function that responds with "pong" to any message. The implementation includes:

1. A React component (`AdminChatPanel.tsx`) that manages the chat UI
2. A Cloudflare Pages Function (`functions/chat.ts`) that handles the chat endpoint

## API Backend

The project includes a RESTful API backend implemented with Cloudflare Workers:

1. **Health Check API**: `/api/health` - Returns the status of the API
2. **Todos API**: `/api/todos` - CRUD operations for todos
   - `GET /api/todos` - Get all todos
   - `GET /api/todos/:id` - Get a specific todo by ID
   - `POST /api/todos` - Create a new todo
   - `PUT /api/todos/:id` - Update a todo
   - `DELETE /api/todos/:id` - Delete a todo

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

### Development

```bash
# Start the development server
yarn dev
# or
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Running with Cloudflare Workers

To run the site with the Cloudflare Workers enabled locally:

```bash
# Build the site and run with workers
yarn build
yarn dev:worker
```

This will build the site and start a local development server with the Cloudflare Workers enabled.

### Testing the API

You can test the API endpoints using tools like curl or Postman:

```bash
# Health check
curl http://localhost:8788/api/health

# Get all todos
curl http://localhost:8788/api/todos

# Create a new todo
curl -X POST http://localhost:8788/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test todo", "completed": false}'
```

### Testing the Chat Functionality

1. Start the development server
2. Navigate to the Admin Chat Panel
3. Type a message and press Enter or click Send
4. You should receive a "pong" response from the server

## Deployment

This project uses Cloudflare Pages for deployment, including the serverless functions.

```bash
# Deploy to development environment
yarn deploy
# or
npm run deploy

# Deploy to production environment
yarn deploy:prod
# or
npm run deploy:prod
```

## Cloudflare Pages Functions

The project uses Cloudflare Pages Functions to handle server-side logic. These functions are located in the `functions` directory:

- `functions/chat.ts`: Handles POST requests to the `/chat` endpoint, responding with a simple "pong" message
- `functions/api/health.ts`: Provides a health check endpoint for the API
- `functions/api/todos.ts`: Implements CRUD operations for todo items
- `functions/_routes.json`: Configures routing for the Cloudflare Pages Functions

## License

MIT
