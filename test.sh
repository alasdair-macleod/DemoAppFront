ssh -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i "alexgre1.pem" ubuntu@ec2-34-201-172-56.compute-1.amazonaws.com /bin/bash << 'EOT'
Xy123456 | sudo docker login -u alexgre --password-stdin
sudo docker stop $(docker ps -q --filter ancestor=alexgre/angulardocker1.0)
sudo docker pull alexgre/aapp
sudo docker run -d --rm -p 80:80 alexgre/aapp
EOT
