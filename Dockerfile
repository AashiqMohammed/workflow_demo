FROM node:18.14.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you're using npm)
COPY package.json package-lock.json* /usr/src/app/

# Install app dependencies
RUN CXXFLAGS="--std=c++14" npm install --force

# Copy the app's source code to the container
COPY . /usr/src/app

# Build the Next.js app
# RUN npm run build

# Expose the port that Next.js listens on
EXPOSE 3000

# Define the command to start the app
# CMD ["npm", "start"]
CMD ["npm", "run" , "dev"]
