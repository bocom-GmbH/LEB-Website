# Multi-stage build for Quasar Vue application
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Development stage
FROM base AS development
EXPOSE 9000
CMD ["yarn", "dev"]

# Build stage
FROM base AS build
RUN yarn build

# Production stage
FROM node:20-alpine AS production

# Install serve for static file serving
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist/spa /app/dist

WORKDIR /app

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
