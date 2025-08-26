# Docker Setup for LEB Website

This document explains how to use Docker with the Quasar Vue.js project.

## Prerequisites

-   Docker
-   Docker Compose

## Available Services

### Development Mode

```bash
# Start development server
docker-compose -f docker-compose.dev.yml up

# Or build and start
docker-compose -f docker-compose.dev.yml up --build
```

### Production Mode

```bash
# Build and start production server
docker-compose -f docker-compose.prod.yml up --build
```

## Ports

-   **Development**: http://localhost:9000
-   **Production**: http://localhost:3000

## Environment Variables

The following environment variables are automatically set:

### Development

-   `NODE_ENV=development`
-   `HOST=0.0.0.0`
-   `PORT=9000`

### Production

-   `NODE_ENV=production`

## Useful Commands

```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f leb-website-dev

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Remove containers and volumes
docker-compose -f docker-compose.dev.yml down -v

# Rebuild without cache
docker-compose -f docker-compose.dev.yml build --no-cache

# Access container shell
docker-compose -f docker-compose.dev.yml exec leb-website-dev sh
```

## File Structure

```
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.dev.yml        # Development environment
├── docker-compose.prod.yml       # Production environment
├── .dockerignore                 # Files to exclude from Docker build
└── README-Docker.md              # This file
```

## Development Workflow

1. **Start development server:**

    ```bash
    docker-compose -f docker-compose.dev.yml up
    ```

2. **Make changes to your code** - they will be reflected automatically due to volume mounting

3. **View logs:**

    ```bash
    docker-compose -f docker-compose.dev.yml logs -f leb-website-dev
    ```

4. **Stop development server:**

    ```bash
    docker-compose -f docker-compose.dev.yml down
    ```

## Production Deployment

1. **Build and start production:**

    ```bash
    docker-compose -f docker-compose.prod.yml up --build -d
    ```

2. **Check if it's running:**

    ```bash
    docker-compose -f docker-compose.prod.yml ps
    ```

3. **View production logs:**

    ```bash
    docker-compose -f docker-compose.prod.yml logs -f leb-website-prod
    ```

## Troubleshooting

### Port already in use

If port 9000 or 3000 is already in use, modify the ports in the respective docker-compose file:

```yaml
ports:
    - '9001:9000' # Change 9000 to 9001
```

### Permission issues

If you encounter permission issues on Linux/macOS:

```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or run with sudo (not recommended for development)
sudo docker-compose -f docker-compose.dev.yml up
```

### Build issues

If the build fails, try:

```bash
# Clean up
docker-compose -f docker-compose.dev.yml down -v
docker system prune -f

# Rebuild
docker-compose -f docker-compose.dev.yml up --build
```

## Health Check

The production server runs on port 3000 and serves the built SPA application.
