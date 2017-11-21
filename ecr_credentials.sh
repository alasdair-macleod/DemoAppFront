cat > ~/.aws/credentials /bin/bash << EOL
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOL

eval $(aws ecr get-login --no-include-email --region us-east-1)