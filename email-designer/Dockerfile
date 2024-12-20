# Use a compatible Node.js version
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
