#!/bin/bash

# Build and run Angular app with Docker

echo "Building Docker image..."
docker build -t losev-angular:latest .

echo "Running Docker container..."
docker run -d -p 80:80 --name losev-angular-container losev-angular:latest

echo "Angular app is running on http://localhost"
echo "To stop the container: docker stop losev-angular-container"
echo "To remove the container: docker rm losev-angular-container"
