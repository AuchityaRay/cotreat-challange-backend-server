# # Use an official Node.js runtime as the base image
# FROM node:20.15.0

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY . .

# RUN npm install

# EXPOSE 3000

# CMD ["npm", "run", "start:dev"]




# # # Install dependencies
# # RUN npm install --production

# # # Copy the rest of the application code to the working directory
# # COPY . .

# # # Build the application (if you're using a build step)
# # RUN npm run build

# # # Expose the port the app runs on
# # EXPOSE 3000

# # # Command to run the application
# # CMD ["npm", "run", "start:prod"]



# Use an official Node.js image as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies, including dev dependencies
RUN npm install

# Copy the rest of the application's code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "run", "start:prod"]
