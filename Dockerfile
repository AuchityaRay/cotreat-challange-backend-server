# Use an official Node.js runtime as the base image
FROM node:20.15.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]


EXPOSE 3000

# # Install dependencies
# RUN npm install --production

# # Copy the rest of the application code to the working directory
# COPY . .

# # Build the application (if you're using a build step)
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 3000

# # Command to run the application
# CMD ["npm", "run", "start:prod"]
