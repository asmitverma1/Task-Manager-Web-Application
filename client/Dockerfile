# Use the official Node.js image as base
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY . .

# Build the React app
RUN npm run build

# Use NGINX for serving the static files
FROM nginx:alpine

# Copy the built React app to NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
