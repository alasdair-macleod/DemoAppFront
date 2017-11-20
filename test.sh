ssh -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i "alexgre1.pem" ubuntu@ec2-34-201-172-56.compute-1.amazonaws.com /bin/bash << 'EOT'
v1=$"alex"
echo $v1
echo $v2
echo "hello world"
EOT