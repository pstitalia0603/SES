# Use a specific Node.js version as the base image (you can use node:16 or node:18 depending on your needs)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Clean npm cache and install dependencies with legacy-peer-deps to handle peer dependency issues
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the entire project to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Expose port 3002 (the port the app will listen to inside the container)
EXPOSE 3002

# Start the app using npm and listen on port 3002
CMD ["npm", "start", "--", "--port", "3002"]
