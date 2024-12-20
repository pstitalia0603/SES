# Use a compatible Node.js version
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install Angular CLI globally and install project dependencies
RUN npm install -g @angular/cli && npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Run the build
RUN npm run build --prod  # This will build the Angular app in production mode

# Serve the built app using Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
