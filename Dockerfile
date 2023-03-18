# Base image with your desired Node.js version
ARG NODE_VERSION=18.15.0
FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Run tests
RUN npm test

# Expose port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
