# Use a specific Node.js version as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the entire project to the container
COPY . .

# Run the build command
RUN npm run build

# Expose port 80 (we will map this to 3002 in the compose file)
EXPOSE 80

# Start the app
CMD ["npm", "start"]
