# Use the official Node.js image as base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server application code
COPY . .

# Expose the port on which your server app runs
EXPOSE 5000

# Command to run the server application
CMD ["node", "index.js"]
