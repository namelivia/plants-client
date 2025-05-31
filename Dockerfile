# base builder stage
FROM node:22.16.0-alpine as base-builder
env CI=true

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

WORKDIR /app

# Copy dependency files and source code
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --dev && \
    pnpm install --frozen-lockfile

COPY . .

# build stage for production
FROM base-builder as production-builder
RUN pnpm run build

# production stage
FROM nginx:stable-alpine as production
COPY --from=production-builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# development stage
FROM base-builder as development
EXPOSE 4173
CMD ["pnpm", "run", "serve", "--host=0.0.0.0"]
