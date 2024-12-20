# Use a Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Run the build command (adjusted based on the package.json)
RUN npm run build

# Expose port 80 (or 3002 if you want) to be used by the container
EXPOSE 80

# Start the app using the appropriate command
CMD ["npm", "start"]
