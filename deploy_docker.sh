ssh -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i ${EC2_SSH_KEY} ubuntu@ec2-34-201-172-56.compute-1.amazonaws.com /bin/bash << 'EOT'
REPO=${ECR_REPO}
IMAGE=${ECR_IMG}
sudo docker stop $(docker ps -q --filter ancestor=$REPO/$IMAGE:latest)
$(aws ecr get-login --no-include-email --region us-east-1)
sudo docker pull $REPO/$IMAGE
sudo docker run -d -p 80:80 $REPO/$IMAGE
EOT