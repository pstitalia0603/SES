# Use official Node.js image as the base image
FROM node:18 AS build

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular app
RUN npm run build -- --prod

# Install an HTTP server to serve the built app
FROM nginx:alpine

# Copy the build files from the previous image to the Nginx web server
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
