# Use a compatible Node.js version
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (including Angular CLI)
RUN npm install -g @angular/cli && npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build --prod  # Use `--prod` to build for production

# Use Nginx to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
