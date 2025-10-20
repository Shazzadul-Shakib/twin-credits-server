# Stage 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: production or dev
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

# Set default command based on NODE_ENV
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

CMD if [ "$NODE_ENV" = "development" ]; then npm install && npx ts-node-dev --respawn --transpile-only --loader ts-node/esm --watch src/**/*.ts src/server.ts; else npm start; fi
