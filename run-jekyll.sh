#!/bin/bash

# Stop any existing containers
echo "Stopping any existing containers..."
docker-compose down 2>/dev/null || true

# Remove any dangling instances
echo "Cleaning up..."
docker rm -f womenseye-site 2>/dev/null || true

# Build and start the container
echo "Starting Jekyll server..."
docker-compose up --build

# The container will continue running in the foreground
# Press Ctrl+C to stop it 