# Step 1: Use a Node.js image with version 18 or higher
FROM node:18-slim

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Install Angular CLI globally
RUN npm install -g @angular/cli

# Step 4: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 5: Install dependencies with legacy-peer-deps flag to resolve potential peer dependency issues
RUN npm install --legacy-peer-deps

# Step 6: Copy all the source code to the working directory
COPY . .

# Step 7: Build the Angular application in production mode
RUN npm run build --prod

# Step 8: Expose port 3002 for the application
EXPOSE 3002

# Step 9: Run the Angular app using the "ng serve" command
CMD ["npm", "start"]
