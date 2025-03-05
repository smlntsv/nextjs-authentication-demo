#!/bin/bash

# Check if the DOCKER_REGISTRY variable is set
if [ -z "$DOCKER_REGISTRY" ]; then
  echo "Error: The DOCKER_REGISTRY environment variable is not set."
  exit 1
fi

# Get confirmation
read -r -p "This will build and upload PRODUCTION image to $DOCKER_REGISTRY. Continue? (yes/no) " response

# Check the response and exit if it is not "yes"
if [[ "$response" != "yes" ]]; then
    echo "Operation canceled."
    exit 1
fi

echo "Checking .env file..."
env_file=".env.production"

# Check if input env file exists
if [[ ! -f "$env_file" ]]; then
    echo "Production env file ($env_file) not found!"
    exit 1
fi

# Get the version and name from package.json
VERSION=$(node -pe "require('./package.json').version")
IMAGE_NAME=$(node -pe "require('./package.json').name")

# Get the commit hash from Git
COMMIT_HASH=$(git rev-parse --short HEAD)

echo "Building image..."

# Build the Docker image
docker build -t "$IMAGE_NAME" .

# Tag image
docker tag "$IMAGE_NAME" "$DOCKER_REGISTRY/$IMAGE_NAME:$VERSION-commit-$COMMIT_HASH"

# Login to registry
docker login "$DOCKER_REGISTRY"

# Push tagged image
docker push "$DOCKER_REGISTRY/$IMAGE_NAME:$VERSION-commit-$COMMIT_HASH"

# Optionally, tag and push as "latest" as well
docker tag "$IMAGE_NAME" "$DOCKER_REGISTRY/$IMAGE_NAME:latest"
docker push "$DOCKER_REGISTRY/$IMAGE_NAME:latest"
