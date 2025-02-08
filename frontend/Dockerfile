# Use official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire React app
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build
FROM nginx:alpine

# Copy the build output to Nginx's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
