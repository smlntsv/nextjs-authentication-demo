#!/bin/bash
set -euo pipefail

# Check if the DOCKER_REGISTRY variable is set
if [ -z "$DOCKER_REGISTRY" ]
then
  echo "❌ Error: The DOCKER_REGISTRY environment variable is not set."
  exit 1
fi

# Get confirmation
read -r -p "⚠️ This will build and upload PRODUCTION image to $DOCKER_REGISTRY. Continue? (yes/no) " RESPONSE

# Check the response and exit if it is not "yes"
if [[ "$RESPONSE" != "yes" ]]
then
    echo "❎  Operation canceled."
    exit 1
fi

echo "🔍 Checking .env file..."
ENV_FILE=".env.production"
if [[ ! -f "$ENV_FILE" ]]
then
    echo "❌ Production env file ($ENV_FILE) not found!"
    exit 1
fi

# Verify package.json exists
if [[ ! -f "package.json" ]]
then
  echo "❌ package.json not found!"
  exit 1
fi

# Extract version and name from package.json
VERSION=$(node -pe "require('./package.json').version")
IMAGE_NAME=$(node -pe "require('./package.json').name")

# Get the commit hash from Git
COMMIT_HASH=$(git rev-parse --short HEAD)

echo "🐳 Starting Docker build for image: $IMAGE_NAME"

# Build the Docker image
if ! docker build -t "$IMAGE_NAME" .
then
  echo "❌ Docker build failed! Exiting..."
  exit 1
fi

# Login to registry
echo "🔐 Logging in to $DOCKER_REGISTRY..."
if ! docker login "$DOCKER_REGISTRY"
then
  echo "❌ Docker login failed! Exiting..."
  exit 1
fi

# Tags
IMAGE_TAG="$DOCKER_REGISTRY/$IMAGE_NAME:$VERSION-commit-$COMMIT_HASH"
LATEST_TAG="$DOCKER_REGISTRY/$IMAGE_NAME:latest"

# Tag and push the image
if ! docker tag "$IMAGE_NAME" "$IMAGE_TAG"
then
  echo "❌ Docker tag for $IMAGE_NAME failed! Exiting..."
  exit 1
fi

if ! docker push "$IMAGE_TAG"
then
  echo "❌ Docker push for $IMAGE_TAG failed! Exiting..."
  exit 1
fi

echo "✅ Image pushed as $IMAGE_TAG"

# Tag and push as "latest"
if ! docker tag "$IMAGE_NAME" "$LATEST_TAG"
then
  echo "❌ Docker tag for 'latest' failed! Exiting..."
  exit 1
fi

if ! docker push "$LATEST_TAG"
then
  echo "❌ Docker push for 'latest' failed! Exiting..."
  exit 1
fi

echo "✅ Image pushed as latest: $LATEST_TAG"
echo "🚀 Docker image build and push completed successfully!"
