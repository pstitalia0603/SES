# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Ensure the Angular workspace is correctly set up
# (Optional) You can run Angular CLI commands to verify the workspace if needed

# Build the Angular application
RUN ng build --configuration production

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
