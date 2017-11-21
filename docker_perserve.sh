# SET THE FOLLOWING VARIABLES
# docker repo username
REPO=$"538225610467.dkr.ecr.us-east-1.amazonaws.com"
# image name
IMAGE=$"glimmps_frontend"
#version 
VERSION=$(node -e "console.log(require('./package.json').version)")
#build image
docker build -t $REPO/$IMAGE:latest -t $REPO/$IMAGE:$VERSION .
#upload the image to AWS ECR repo
mkdir -p ~/.aws
cat > ~/.aws/credentials << EOL
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOL
eval $(aws ecr get-login --no-include-email --region us-east-1)
docker push $REPO/$IMAGE:latest
docker push $REPO/$IMAGE:$VERSION