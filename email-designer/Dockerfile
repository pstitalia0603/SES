# Step 1: Use the official Node.js image to build the Angular app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Use Nginx to serve the Angular app
FROM nginx:alpine

# Copy the build files from the first stage into Nginx's default HTML folder
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx in the foreground (necessary for Docker to keep running the container)
CMD ["nginx", "-g", "daemon off;"]
