ssh -o StrictHostKeyChecking=no -i "alexgre1.pem" ubuntu@ec2-34-201-172-56.compute-1.amazonaws.com /bin/bash <<'EOT'
sudo docker stop $(docker ps -q --filter ancestor=alexgre/angulardocker1.0)
sudo docker pull alexgre/app_latest
sudo docker run --rm -p 80:80 alexgre/app_latest
EOT
