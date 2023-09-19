# Stage 1: Build the application
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of your application code to the container
COPY . .

# Stage 2: Create a minimal image
FROM node:14-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/ .

# Expose the port your app will run on
EXPOSE 3000

# Start the application
CMD [ "node", "index.js" ]
