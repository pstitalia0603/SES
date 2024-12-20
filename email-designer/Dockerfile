# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies (including Angular dependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application files into the container
COPY . .

# List the files to verify the directory structure
RUN ls -la /app

# Build the Angular application
RUN npm run build --prod

# Expose port 3002
EXPOSE 3002

# Command to start the application
CMD ["npm", "start", "--", "--port", "3002"]
