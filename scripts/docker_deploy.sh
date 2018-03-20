# ##############################################################################################################
# set up env
# ##############################################################################################################
echo REPO=${ECR_REPO} > sshenv
echo IMAGE=${ECR_IMG} >> sshenv
scp -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i ${EC2_SSH_KEY} sshenv ${EC2_URL}:~/
ssh -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i ${EC2_SSH_KEY} ${EC2_URL} /bin/bash << 'EOT'
# #############################################################################################################
# start marking variables for export
# #############################################################################################################
set -a
. ./sshenv
set +a
# #############################################################################################################
# stop old container
# #############################################################################################################
sudo docker stop $(docker ps -q --filter ancestor=$REPO/$IMAGE:latest)
# #############################################################################################################
# log into EC2 instance. Pull and deploy new container.
# #############################################################################################################
$(aws ecr get-login --no-include-email --region us-east-1)
sudo docker pull $REPO/$IMAGE
sudo docker run -d -p 80:80 $REPO/$IMAGE
# #############################################################################################################
# clean up
# #############################################################################################################
rm -f sshenv
EOT
