FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy configuration and source files
COPY tsconfig.json tsconfig.client.json drizzle.config.ts ./
COPY public ./public
COPY src ./src

# Compile client bundle
RUN npm run build:client

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]

