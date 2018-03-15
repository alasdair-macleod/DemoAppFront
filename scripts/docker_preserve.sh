# docker repo username
REPO=${ECR_REPO}
# image name
IMAGE=${ECR_IMG}
#version
VERSION=$(node -e "console.log(require('./package.json').version)")
#build image
docker build -t $REPO/$IMAGE:latest -t $REPO/$IMAGE:$VERSION .
#upload the image to AWS ECR repo
docker push $REPO/$IMAGE:latest
docker push $REPO/$IMAGE:$VERSION
