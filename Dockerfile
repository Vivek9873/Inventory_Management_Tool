# Base image
FROM node:20

# Working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all other files (like app.js, public etc.)
COPY . .

# Environment variable for port
ENV PORT=8080

# Expose port from container
EXPOSE ${PORT}

# Start the app
CMD ["npm", "start"]
