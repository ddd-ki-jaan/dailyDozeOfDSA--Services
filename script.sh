#!/bin/bash

# Navigate to the Client directory
cd dailyDozeOfDSA--Client

# Install dependencies for the Client (uncomment if needed)
# npm install

# Build the Client
npm run build

# Navigate back to the root directory
cd ..

cd dailyDozeOfDSA--Server

rm -rf dist/

cd ..

# Copy the 'dist' folder from the Client to the Server directory
mv ./dailyDozeOfDSA--Client/dist ./dailyDozeOfDSA--Server/

# Navigate to the Server directory
cd dailyDozeOfDSA--Server

# Install dependencies for the Server (uncomment if needed)
# npm install

# Start the Server
npm start