#!/bin/bash

echo "Starting Women's Eye website..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker first."
    echo "Visit https://docs.docker.com/get-docker/ for installation instructions."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if a container is already running on port 4000 or 4001
if docker ps | grep -q "0.0.0.0:4001->4000/tcp" || docker ps | grep -q "0.0.0.0:4000->4000/tcp"; then
    echo "A Jekyll container is already running. You can view the website at one of these URLs:"
    echo "http://localhost:4000"
    echo "http://localhost:4001"
    
    read -p "Do you want to stop the existing container and start a new one? (y/n): " answer
    if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
        echo "Stopping existing Jekyll containers..."
        docker stop $(docker ps | grep jekyll/jekyll | awk '{print $1}')
    else
        echo "Exiting. Please use the existing container."
        exit 0
    fi
fi

echo "This may take a few minutes for the first run."

# Create a container name
CONTAINER_NAME="womenseye-jekyll"

# Run the Docker container in detached mode with platform specified
# Note: We're using platform linux/amd64 with emulation on ARM Macs
docker run --rm -d \
  --name $CONTAINER_NAME \
  --platform linux/amd64 \
  -p 4001:4000 \
  -v "$(pwd):/srv/jekyll" \
  jekyll/jekyll:4.2.0 \
  bash -c "bundle install && jekyll serve --host 0.0.0.0 --livereload"

# Check if container started successfully
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo "Website is starting up..."
    echo "Please wait about 30 seconds for the Jekyll server to initialize"
    echo "Then access the website at http://localhost:4001"
    echo "To see the logs, run: docker logs -f $CONTAINER_NAME"
    echo "To stop the website, run: docker stop $CONTAINER_NAME"
else
    echo "Failed to start the container. Check Docker logs for more information."
    echo "You can try running the container in interactive mode with:"
    echo "docker run --rm -it -p 4001:4000 -v \"\$(pwd):/srv/jekyll\" jekyll/jekyll:4.2.0 bash -c \"bundle install && jekyll serve --host 0.0.0.0\""
fi 