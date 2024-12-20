# Use a compatible Node.js version
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (with latest npm)
RUN npm install -g npm@latest && npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Serve the built app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
