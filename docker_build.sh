set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=alexgre
# image name
IMAGE=demofront
docker build -t $USERNAME/$IMAGE:latest .