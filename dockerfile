# Uses node version 24 as our base image
FROM node:24

# Goes to the app directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependecies
RUN npm install

# Copy the rest of our app into the container
COPY . .

# Copy entrypoint script and make it executable
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# generate prisma schema
RUN npx prisma generate

ENV PORT=8080

# Expose the port so our computer can access it
EXPOSE 8080

# Run the app
CMD ["./docker-entrypoint.sh"]