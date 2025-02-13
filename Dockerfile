# Step 1: Use Node.js official image as base
FROM node:18-alpine

# Step 2: Set working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose the port the app will run on
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]

