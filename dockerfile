# Uses node version 24 as our base image
FROM node:24

# Goes to the app directory
WORKDIR /

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependecies
RUN npm install

#Copy the rest of our app into the container
COPY . .

# generate prisma schema
RUN npx prisma generate
RUN npx primsa migrate dev --name init

# Set port environment variable
ENV PORT=3000

# Expose the port so our computer can access it
EXPOSE 3000

# Run the app
CMD ["npm", "start"]