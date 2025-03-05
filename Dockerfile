# Build Stage
FROM node:22.14-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Build Next.js
RUN npm run build && rm -f .next/standalone/.env*
# Build Storybook
RUN npm run build-storybook

# Runtime Stage
FROM node:22.14-alpine AS runner

# Add Midnight Commander
RUN apk --no-cache add mc

WORKDIR /app

# Copy Next.js output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy Storybook output
COPY --from=builder /app/storybook-static ./public/storybook-static

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]
